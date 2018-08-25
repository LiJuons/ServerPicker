const express = require('express');
const path = require('path');
const cors = require('cors');
var fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

var whitelist = [
    'https://api.nordvpn.com/v1/servers/'
];

var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: false
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

fetch('https://api.nordvpn.com/v1/servers/count', corsOptions)
.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json.count);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
