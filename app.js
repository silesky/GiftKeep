const express = require('express');
const MongoClient = require('mongodb').MongoClient;
//http://mongodb.github.io/node-mongodb-native/2.2/quick-start/
//https://docs.mongodb.com/v3.2/reference/method/db.collection.find/
let friends
MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
    if (err) throw err;
    console.log('...connected to mongoDB!');
    const myCollection = db.collection('friendsCollection'); 
    myCollection.find().toArray((err, docs) => {
         friends = docs;
    });	
});

/*
// gifts
{
  "_id": "58051fc76ed64846830b4098",
  "item": "Baseball"
}

*/
const app = express();
app.get('/api/friends', (req, res) => res.json(friends));
app.listen(3000);		