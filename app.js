const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const Storage  = require('./storage');
const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('./public'));


Storage.connect();

// get all
app.get('/api/', (req, res) => Storage.getAllData(res));


app.post('/api/user', (req, res) => Storage.createUser(req, res)); //parameters are reversed

// get user by token
app.get('/api/user/:token', (req, res) => Storage.getUser(req, res));

// get user data by token
app.get('/api/user/data/:token', (req, res) => Storage.getUserData(req, res));

// update user data by token
app.put('/api/user/data/:token', (req, res) =>  Storage.updateUserData(req, res));


app.get("/oauthcallback", (req, res) => {
  console.log('req success', req.body);
  res.send("Authcallback get");
});
// gifter.sethsilesky.com:3000/oauthcallback
app.post('/oauthcallback', (req, res) => {
  console.log('post request recieved...');
  if (!req.body) return res.sendStatus(400);
    let token = req.body.data;
    const validateThisToken = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
    fetch(validateThisToken).then((el) => {
      //'Content-Type', 'application/x-www-form-urlencoded'
      if (el.status < 300) {
       console.log('token validated! statusText:', el.statusText);
     } else {
        console.log('token invalid! statusText:', el.statusText);
      }})
  })
app.listen(3000);
console.log("listening on http://gifter.sethsilesky.com:3000");
