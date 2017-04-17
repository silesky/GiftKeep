require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(bodyParser.json())
app.use(cookieParser())

const
  fs = require('fs'),
  http = require('http'),
  https = require('https')

const {
  HTTPS_PORT,
  HTTP_PORT,
  NODE_ENV,
  PROD_SSL_CERT_PATH,
  PROD_SSL_CA_PATH,
  PROD_SSL_PRIVKEY_PATH,
} = process.env


const httpDevServer = () => http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`Insecure HTTP server (${NODE_ENV}) listening on port ${HTTP_PORT}`)
})

const sslDevServer = () => https.createServer({
  key: fs.readFileSync('ssl/dev/server.key'),
  cert: fs.readFileSync('ssl/dev/server.crt'),
  ca: fs.readFileSync('ssl/dev/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false,
}, app).listen(HTTPS_PORT, () => {
  console.log(`Secure HTTPS server (${NODE_ENV}) listening on port ${HTTPS_PORT}`)
})

const sslProdServer = () => https.createServer({
  // fix
  key: fs.readFileSync(PROD_SSL_PRIVKEY_PATH),
  cert: fs.readFileSync(PROD_SSL_CERT_PATH),
  ca: fs.readFileSync(PROD_SSL_PRIVKEY_PATH),
  requestCert: true,
  rejectUnauthorized: false,
}, app).listen(HTTPS_PORT, () => {
  console.log(`Secure Express server (${NODE_ENV}) listening on port ${HTTPS_PORT}`)
})

const listen = () => {
  if (NODE_ENV === 'production') {
    sslProdServer()
  } else if (NODE_ENV === 'development' && HTTPS_PORT) {
    sslDevServer()
  } else {
    httpDevServer()
  }
}
listen()

module.exports = { app }
