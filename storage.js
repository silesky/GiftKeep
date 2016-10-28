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
    getUserData: (reqObj, res) => {
         console.log('get request for user data...');
        let results;
        let requestedIdToken = reqObj.params.token;
        userCollection().find().toArray((err, docs) => {
            results = docs.find(el => {
              return (requestedIdToken === el.googleIdToken) 
                ? el 
                : {success: false, msg: 'no user found'}
            })
            res.json(results);
        })
    },
    createUser: (reqObj, res) => {
        console.log('post request to create user...');
        const userObj = { 
            userName: reqObj.body.userName,
            googleIdToken: reqObj.body.googleIdToken,
            data: reqObj.body.data
        }
         try {
            userCollection().insert(userObj);
            res.json({success: true, msg: 'user created'})
        } catch(e) {
            res.json({success: false, error: e })
        }
    },

    // updateUserData: (reqObj, res) => {
    //     console.log('post request to create user...');
    //     const userObj = { 
    //         userName: reqObj.body.userName,
    //         googleIdToken: reqObj.body.googleIdToken,
    //         data: reqObj.body.data
    //     }
    //      try {
    //         userCollection().insert(userObj);
    //         res.json({success: true, msg: 'user created'})
    //     } catch(e) {
    //         res.json({success: false, error: e })
    //     }

    // },

    // createFriend: (req, res) => {
    // },
    // createUserFriend: (req, res) => {
    //     try {
    //         userCollection().insert(???);
    //         res.json({success: true})
    //     } catch(e) {
    //         res.json({success: false, error: e })
    //     }
    //     res.json({success: true, msg: 'friend created.'})
    // },
   
}