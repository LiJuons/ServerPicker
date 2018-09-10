const express = require('express');
const BODYPARSER = require('body-parser');
const FS = require('fs');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const schedule = require('node-schedule');
const app = express();
const {hashSync, compareSync} = require("bcrypt-nodejs");
const {authLocal, authJwt} = require('./passport');
require('./database/connect');

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(BODYPARSER.urlencoded({ extended: true }));
app.use(BODYPARSER.json());
app.use(cors({credentials: true}));
app.use(express.static(path.join(__dirname, '../client')));

//Set schedule for server list update every hour at 15 minutes
let refreshRule = new schedule.RecurrenceRule();
refreshRule.minute = 15;
const refreshSchedule = schedule.scheduleJob(refreshRule, function(){
  serverUpdate();
});

//Middlewares for authentication
const loginMiddleware = (req, res, next) => {
   return authLocal(req, res, next);
}

const authMiddleware = (req, res, next) => {
   return authJwt(req, res, next);
}

//Fetches the new server list and saves it to the file
const serverUpdate = async (req, res) => {
  try {
      const {data} = await axios.get(process.env.SECRET_API);
      let result = {data};

      FS.writeFile(
            __dirname + '/../Servers.json',
            JSON.stringify(result, null, 4),
            (err) => {
                if (err){
                  console.log(err)
                  if (res) {
                    return res.status(400).json({
                      error: 'Failed to update server list.'
                    });
                  }
                }
                if (res) {
                  res.status(200).json({
                    success: 'Successfully updated servers list.'
                  });
                }
            });
  }

  catch(e) {
    console.log(e);
    if (res) {
      res.status(400).json({
        error: 'Failed to fetch servers.'
      });
    }
  }
}

//Login function (username + password confirm)
app.post('/login', loginMiddleware, (req, res, next) => {
  res.status(200).json({token:req.user.toAuthJson().token});
  return next();
});

//Auth check function
app.get('/auth', authMiddleware, (req, res) => {
  res.json("Connected.");
});


//Calls the update function
app.get('/updateServers', authMiddleware, async (req, res) => {
  serverUpdate(req, res);
});

//Fetches the number of servers from the API
app.get('/serverCount', authMiddleware, async (req, res) => {

  try {
      const {data} = await axios.get(process.env.API_COUNT);

      res.status(200).json({
        data
      });
  }

  catch(e) {
    console.log(e);
    res.status(400).json({
      error: 'Failed to reach API.'
    });
  }

});

//Gets servers from the server.json (file)
app.get('/servers', authMiddleware, (req, res) => {
  try {
    FS.readFile(__dirname + '/../Servers.json', (err, data) => {
      if(err) {
        console.log(err);
        return res.status(400).json({
          error: 'Failed to get servers.'
        });
      }
      res.status(200).json(JSON.parse(data));
    });
  }

  catch(e) {
    console.log(e);
    res.status(400).json({
      error: 'Failed to get servers.'
    });
  }
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => console.log('ServerPicker app listening on port', PORT));
