require('dotenv').config();
const DB = require('./db');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
DB.connect();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));


module.exports = {
  app: app,
  listen: () => {
    if (process.env.NODE_ENV === 'development') { app.listen(3000);
      } else  { //
        require('greenlock-express').create({
          server: 'staging'
        , email: 'seth.silesky@gmail.com'
        , agreeTos: true
        , approveDomains: [ 'timeshark.org' ]
        }).listen(3000);
      console.log("listening on http://.sethsilesky.com:3000");
    }
  }
}



