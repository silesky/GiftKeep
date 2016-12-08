require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
module.exports = {
    connect: () => MongoClient.connect(process.env.DB_HOST, (err, db) => {
            if (err) throw err;
            console.log('...connected to mongoDB!!');
    }),
     promiseConnect: () => {
       return new Promise((resolve, reject) => {
          MongoClient.connect(process.env.DB_HOST, (err, db) => {
            if (err) reject(err);
            this.database = db;
            if (db) resolve(db);
          })
      })
    },
    connected: () => typeof database !== 'undefined',
    userCollection: () => this.database.collection('userCollection'),
}