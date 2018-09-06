const express = require('express');
const BODYPARSER = require('body-parser');
const FS = require('fs');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const {hashSync, compareSync} = require("bcrypt-nodejs");
const {authLocal, authJwt} = require('./passport');
require('./database/connect');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(BODYPARSER.urlencoded({ extended: true }));
app.use(BODYPARSER.json());
app.use(cors({credentials: true}));
app.use(express.static(path.join(__dirname, '../client')));

const loginMiddleware = (req, res, next) => {
   return authLocal(req, res, next);
}

const authMiddleware = (req, res, next) => {
   return authJwt(req, res, next);
}

app.post('/login', loginMiddleware, (req, res, next) => {
  res.status(200).json({token:req.user.toAuthJson().token});
  return next();
});

app.get('/auth', authMiddleware, (req, res) => {
  res.json("Success! You would not see this without a token.");
});

app.get('/serverCount', async (req, res) => {

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

app.get('/updateServers', async (req, res) => {

  try {
      const {data} = await axios.get(process.env.SECRET_API);
      let result = {data};

      FS.writeFile(
            __dirname + '/../Servers.json',
            JSON.stringify(result, null, 4),
            (err) => {
                if (err){
                  console.log(err)
                  return res.status(400).json({
                    error: 'Failed to update server list.'
                  });
                }
                res.status(200).json({
                  success: 'Successfully updated servers list.'
                });
            });
  }

  catch(e) {
    console.log(e);
    res.status(400).json({
      error: 'Failed to fetch servers.'
    });
  }

});

app.get('/servers', (req, res) => {
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

app.listen(3000, () => console.log('ServerPicker listening on port 3000!'));
