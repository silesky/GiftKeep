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
    // get all
    getAllData: (res) => {
        userCollection().find().toArray((err, docs) => {
            res.json(docs);
        });
    },
    // create user
    createUser: (reqObj, res) => {
        console.log('post request to create user...');
        const userObj = {
            userName: reqObj.body.userName,
            googleIdToken: reqObj.body.googleIdToken,
            data: reqObj.body.data
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
    updateUserData: (reqObj, res) => {
        console.log('put for new user..!');
        const requestedIdToken = reqObj.params.token;
        const requestedUserData = reqObj.body;
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
        userCollection().update({
            googleIdToken: requestedIdToken
        }, {
            $set: {
                data: requestedUserData
            }
        }, _writeConcernCb)
    }
}