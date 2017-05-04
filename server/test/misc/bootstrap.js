const userCollectionJSON = require('./../../seeds/userCollection.json')
const MongoClient = require('mongodb').MongoClient
const config = require('../test_config.json')
const { DB_STRING } = config;
const connect = MongoClient.connect.bind(this, DB_STRING)
module.exports = {
  getAndCreateUserCollection: () => new Promise((response, reject) => {
  connect((err, db) => {
    if (err) reject(err)
    db.createCollection('userCollection')
      .then(userCollection => {
        userCollection.remove({})
        userCollection.insert(userCollectionJSON)
          .then(res => console.log(res.status))
        response(userCollection)
     })
  })
})
}
