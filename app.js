const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

let all, friends, gifts;
MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
    if (err) throw err;
    console.log('...connected to mongoDB!');
    const myCollection = db.collection('friendsCollection'); 
    myCollection.find().toArray((err, docs) => {
        all = docs;
        friends = docs.map(el => el.name);
        gifts = docs.map(el => el.gifts);
    }); 
});



app.get('/api/', (req, res) => res.json(all));
app.get('/api/friends', (req, res) => res.json(friends));
/*
[
  "Nick",
  "Dan",
  "Stephen"
]
*/
app.get('/api/gifts', (req, res) => res.json(gifts));

/* 
[
  [
    {
      "giftType": "Book",
      "giftName": "The Once and Future King"
    }
  ],
  [
    {
      "giftType": "Record",
      "giftName": "The Beatles Revolver"
    }
  ],
  [
    {
      "giftType": "Gadget",
      "giftName": "Serfas Bike Light"
    }
  ]
]
*/


  const newUser  = (name) => ({name})
  //send a newUser as a json object
  app.post('/api/friends', (req, res) => {
   if (!req.body) return res.sendStatus(400)
      console.log(req.body);
  });

app.listen(3000);       