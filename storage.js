const MongoClient = require('mongodb').MongoClient;
let db;
const userCollection = () => db.collection('friendCollection');
module.exports = {
    connect: () => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, database) => {
            if (err) throw err;
            console.log('...connected to mongoDB!');
            db = database;
        });
    },
    connected: () => typeof database !== 'undefined',
    getAllData: (res) => {
        userCollection().find().toArray((err, docs) => {
            res.json(docs);
        });
    },
    getUserData: (res, idToken) => {
        console.log('idToken from url:', idToken);
        userCollection().find().toArray((err, docs) => {
            docs.find(el => {
                if (idToken === el.googleIdToken) { 
                    res.json(el) 
                } else {
                    res.json({
                        success: false,
                        error: 'token not found'
                    })
                }
            })
        })
    }
}