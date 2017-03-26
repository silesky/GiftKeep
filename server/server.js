require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));

const
  fs = require('fs'),
  http = require('http'),
  https = require('https')
;
const { HTTPS_PORT, HTTP_PORT, NODE_ENV } = process.env;

const httpServer = () => http.createServer(app).listen(HTTP_PORT, () => {
      console.log(`Insecure HTTP server (${NODE_ENV}) listening on port ${HTTP_PORT}`);
 });

const sslServer = () => https.createServer({
      key: fs.readFileSync('./ssl/server.key'),
      cert: fs.readFileSync('./ssl/server.crt'),
      ca: fs.readFileSync('./ssl/ca.crt'),
      requestCert: true,
      rejectUnauthorized: false
  }, app).listen(HTTPS_PORT, () => {
      console.log(`Secure Express server (${NODE_ENV}) listening on port ${HTTPS_PORT}`);
  });

const listen = () => {
  if (NODE_ENV === 'development') {
    httpServer();
  } else { //
    sslServer()
    httpServer();
  }
}
listen()
module.exports = { app }
