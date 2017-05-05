require('dotenv').config()
const { DB_HOST, DB_USER, DB_NAME, DB_PASS, USES_AUTHENTICATION } = process.env
const MongoClient = require('mongodb').MongoClient
module.exports = {
  promiseConnect: () => {
    return new Promise((resolve, reject) => {
      const _connectCallback = (err, db) => {
        if (err) reject(err)
        this.database = db
        if (db) resolve(db)
      }

      USES_AUTHENTICATION === 'false'
        ? MongoClient.connect(
            `mongodb://${DB_HOST}/${DB_NAME}`,
            _connectCallback
          )
        : MongoClient.connect(
            `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
            _connectCallback
          )
    })
  },

  connected: () => typeof database !== 'undefined',
  userCollection: () => this.database.collection('userCollection'),
}
