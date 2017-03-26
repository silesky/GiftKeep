require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));

const listen = () => {
  if (process.env.NODE_ENV === 'development') {
    app.listen(3000);
  } else { //

    // require('greenlock-express').create({
    //   server: 'staging',
    //   email: 'seth.silesky@gmail.com',
    //   agreeTos: true,
    //   approveDomains: ['timeshark.org']
    // }).listen(3000);
    // console.log("listening on http://.sethsilesky.com:3000");
  }
}
listen()
module.exports = app
