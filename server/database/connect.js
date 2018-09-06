const Mongoose = require("mongoose");
//const CONFIG = require("../config.json");

const USER = 'tesonet';//CONFIG.db.username;
const PASS = 'tesonet1';//CONFIG.db.password;
const URL = '@ds235352.mlab.com:35352/server-picker';//CONFIG.db.url;

Mongoose.connect(`mongodb://${USER}:${PASS}${URL}`, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(`Error in Mongoose: ${String(err)}`);
      }
    else {
        console.log('<<<< Mongoose Connected');
      }
});
