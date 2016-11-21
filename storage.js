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
    getAllData: () => {
        return new Promise((resolve, reject) => {
            userCollection().find().toArray((err, docs) => {
                if (err) {
                    reject({ success: false, error: err })
                } else {
                    resolve({ success: true, payload: docs })
                }
            })
        })
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
        console.log('storage.createUserFromFb()');
        // should also return data
        const userObj = {
            userName: userName,
            fbAccessToken: fbAccessToken,
            googleIdToken: null,
            data: [] // no data
        }
        try {
            //check if user exists with access
            return userCollection().insert(userObj).then(() =>
                res.json({
                    success: true,
                    msg: 'user created',
                })
            )
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
  
    // get user by token
    
    getUserByAccessToken: (token, resCb) => {
    // TODO: refactor to use promises, like in getAlData
        console.log('getUserByAccessToken() checking database for user...');
        let results;
        userCollection().find().toArray((err, docs) => {
            results = docs.find(el => token === el.fbAccessToken);
            if (err) {
                if (err) console.warn('error!', err)
                resCb.json({success: false, message: 'some error', error: err})
            } 
            else if (results) {
                console.log('results found!', results)
                resCb.json({success: true, payload: results});
            } else {
                console.log(' no user found!', results)
                resCb.json({success: false, message: 'Unable to return user. No user found with that access token.'})
            }
            
        })
    },
    // get userData by fBAccessToken 
    getUserDataByAccessToken: (token, res) => {
        console.log('getUserDataByAccessToken()...');
        let results;
        userCollection().find().toArray((err, docs) => {
             results = docs.find(el => token === el.fbAccessToken);
            if (err) { 
                res.json({success: false, message: 'mongo error', error: err })
            } else if (results) {
                res.json({success: true, payload: results['data']});
            } else {
                 res.json({success: false, message: 'Unable to return user data. No user found with that access token.'})
            }
        })
    },
    //update user data by token
    //db.userCollection.update({fbAccessToken: 1},{ $set: {'data': ["hello"]}})

    updateUserDataByAccessToken: (token, data, res) => {
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