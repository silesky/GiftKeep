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

app.get('/api/', (req, res) => Storage.getAllData(res));
// takes a user id token, returns the user object
app.get('/api/:token', (req, res) => Storage.getUserData(req, res));

//send a newUser as a json object { "name": "bilssl"}
app.post('/api/user', (req, res) => Storage.createUser(req, res)); //parameters are reversed

// app.post('/api/friends', (req, res) => Storage.createUserFriend(req, res));
// send a newGift as a json object {"giftName":"Toothpaste","friends":["Stephen"]}
// app.post('/api/gifts', (req, res) => Storage.createUserGift(req, res));

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
