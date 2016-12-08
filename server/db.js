require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
module.exports = {
    connect: () => MongoClient.connect(process.env.DB_HOST, (err, database) => {
            if (err) throw err;
            console.log('...connected to mongoDB!');
            this.db = database;
            return database
    }),
     promiseConnect: () => {
       return new Promise((resolve, reject) => {
          MongoClient.connect(process.env.DB_HOST, (err, db) => {
            if (err) reject(err);
            if (db) resolve (db)
          })
    })
    },
    connected: () => typeof database !== 'undefined',
    userCollection: () => this.db.collection('userCollection'),
}