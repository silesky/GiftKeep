const userCollectionJSON = require('./../../seeds/userCollection.json')
const MongoClient = require('mongodb').MongoClient
const config = require('../test_config.json')
const { DB_STRING } = config;
module.exports = {
  connect: (done) => new Promise((response, reject) => {
  MongoClient.connect(DB_STRING, (err, db) => {
    if (err) reject(err)
    db.createCollection('userCollection').then(() => {
      const userCollection = db.collection('userCollection')
      userCollection.remove({})
      userCollection.insert(userCollectionJSON)
      response(userCollection)
      done()
    })
  })
})
}
