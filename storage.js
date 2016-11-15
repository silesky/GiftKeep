const MongoClient = require('mongodb').MongoClient;
let db;
const userCollection = () => db.collection('userCollection');
module.exports = {
    connect: () => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, database) => {
            if (err) throw err;
            console.log('...connected to mongoDB!');
            db = database;
            return db
        });
    },
    connected: () => typeof database !== 'undefined',
    // get all
    getAllData: (res) => {
        userCollection().find().toArray((err, docs) => {
            res.json(docs);
        });
    },
    // create user
    // temp? for debugging
    createUser: ({body: {userName, googleIdToken, data}}, res) => {
        console.log('post request to create user...');
        const userObj = {
            userName: userName,
            fbAccessToken: null,
            googleIdToken: googleIdToken,
            data: data,
        }
        try {
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created'
            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
    createUserFromGoogle: ({userName, googleIdToken}, res) => {
        console.log('create user from google!');
        const userObj = {
            userName: userName,
            fbAccessToken: null,
            googleIdToken: googleIdToken,
            data: [],
        }
        try {
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created'
            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
     createUserFromFb: ({userName, fbAccessToken}, res)  => {
        console.log('create user from fb!');
        const userObj = {
            userName: userName,
            fbAccessToken: fbAccessToken,
            googleIdToken: null,
            data: []
        }
        try {
            //check if user exists with access
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created'
            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
    // get user by token
    getUser: (reqObj, res) => {
        console.log('get request for user...');
        let results;
        let requestedIdToken = reqObj.params.token;
        userCollection().find().toArray((err, docs) => {
            results = docs.find(el => requestedIdToken === el.googleIdToken)
            res.json(results);
        })
    },
    // get userData by token 
    getUserData: (reqObj, res) => {
        console.log('get request for user data...!');
        let results;
        let requestedIdToken = reqObj.params.token;
        userCollection().find().toArray((err, docs) => {
            results = docs.find(el => requestedIdToken === el.googleIdToken)
            res.json(results['data']);
        })
    },
    //update user data by token
    //db.userCollection.update({fbAccessToken: 1},{ $set: {'data': ["hello"]}})

    updateUserDataByAccessToken: (reqObj, res) => {
        const { data } = reqObj.body;
        const { token } = reqObj.params;
        console.log(data, token)
        console.log('updateUserData called... token->', token, 'data->', data);
    
        const _writeConcernCb = (err, {
            result
        }) => {
            if (err || !result.nModified) {
                res.json({
                    success: false,
                    statusText: 'error or 0 rows modified',
                    msg: result,
                })
            } else {
                res.json({
                    success: true,
                    msg: result,
                    statusText: `success. ${result.nModified} row(s) modified`
                })
            }  
        }
        // TODO: take in fbAccessToken and data as params
        userCollection().update({fbAccessToken: token},{ $set: {'data': data}}, _writeConcernCb)
        // checks if access token is either googleor facebook
    },

}