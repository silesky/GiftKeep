const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const fetch = require('node-fetch');


let all, friends, gifts, friendCollection, giftCollection;
MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
    if (err) throw err;
    console.log('...connected to mongoDB!');
    friendCollection = db.collection('friendCollection');
    giftCollection = db.collection('giftCollection');
    friendCollection.find().toArray((err, docs) => {
        all = docs;
        //friends = docs.map(el => el.friendName);
        //gifts = docs.map(el => el.gifts);
    });
});

app.use(express.static('./public'));
app.get('/api/', (req, res) => res.json(all));
app.get('/api/friends', (req, res) => res.json(friends));
app.get('/api/gifts', (req, res) => res.json(gifts));
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
      if (el.status < 300) {
       console.log('token validated! statusText:', el.statusText);
     } else {
        console.log('token invalid! statusText:', el.statusText);
      }})
  })


app.listen(3000);
console.log("listening on http://gifter.sethsilesky.com:3000");
