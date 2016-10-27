const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('./public'));

let friendCollection;
let giftCollection;
MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
    if (err) throw err;
    console.log('...connected to mongoDB!');
    friendCollection = db.collection('friendCollection');
    giftCollection = db.collection('giftCollection');
});

app.get('/api/', (req, res) => {
  friendCollection.find().toArray((err, docs) => res.json(docs));
});
app.get('/api/:token', (req, res) => { // takes a token, returns the user object
  let token = req.params.token;
  console.log('idToken from url:', token);
  friendCollection.find().toArray((err, docs) => {
    let result = docs.find(el => {
      if (token === el.googleIdToken) {
        return el
      } else {
        res.json({success: false, error: 'token not found'})
      }
    });
    if (result) res.json(result);
  });
});

//send a newUser as a json object { "name": "bilssl"}
app.post('/api/friends', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  try {
    friendCollection.insert(req.body);
  } catch(e) {
    res.json({success: false, error: e })
  }
  res.json({success: true, msg: 'friend created.'})
});
//send a newGift as a json object {"giftName":"Toothpaste","friends":["Stephen"]}
app.post('/api/gifts', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  try {
    // also needs a friendCollection insert?
    giftCollection.insert(req.body);
  } catch(e) {
    res.json({success: false, error: e })
  }
  res.json({success: true, msg: 'gift created.'})
});
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
