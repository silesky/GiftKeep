let db;
const MongoClient = require('MongoClient');
module.exports = {
    connect: () => MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, database) => {
            if (err) throw err;
            console.log('...connected to mongoDB!');
            db = database;
            return database
    }),

    connected: () => typeof database !== 'undefined',
    userCollection: () => db.collection('userCollection'),

}