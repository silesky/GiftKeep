const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

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
  }
  )


app.listen(3000);       