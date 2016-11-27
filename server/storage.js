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
        if (docs) {
          resolve(docs)
        }
        else if (err) {
          reject(err)
        } else {
          reject('no data found')
        }
      })
    })
  },
  // create user
  // temp? for debugging
  createUser: ({body: {userName, fbId, googleIdToken, data}}, res) => {
    console.log('post request to create user...');
    const userObj = {
      userName: userName,
      fbId: fbId,
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
  createUserFromFb: (userName, fbAccessToken, fbId) => {
    console.log('storage.createUserFromFb()');
    // should also return data
    const userObj = {
      userName: userName,
      fbAccessToken: fbAccessToken,
      fbId: fbId,
      googleIdToken: null,
      data: [] // no data
    }
    return new Promise((resolve, reject) => {
      userCollection().insert(userObj, (err, records) => {
        if (err) {
          reject(err)
        } else {
          resolve(records)
        }
      })

    })

  },

  // get user by token

  getUserByAccessToken: (token) => {
    // TODO: refactor to use promises, like in getAlData
    console.log('getUserByAccessToken() checking database for user...');
    return new Promise((resolve, reject) => {
      userCollection().find().toArray((err, docs) => {
        const results = docs.find(el => token === el.fbAccessToken);
        // if token is 5, expect it to return {user: john}
        if (results) {
          resolve(results);
        } else if (err) {
          reject(err)
        } else {
          reject('no results found')
        }
      })

    })
  },

  getUserByFbId: (fbId) => {
    // TODO: refactor to use promises, like in getAlData
    console.log('getUserByAccessToken() checking database for user...');
    return new Promise((resolve, reject) => {
      userCollection().find().toArray((err, docs) => {
        const results = docs.find(el => fbId === el.fbId);
        if (results) {
          resolve(results);
        } else if (err) {
          reject(err)
        } else {
          reject('no db result found')
        }
      })

    })
  },
  updateUserDataByAccessToken: (token, data, res) => {
    console.log('updateUserData called... token->');
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
    userCollection().update({ fbAccessToken: token }, { $set: { 'data': data } }, _writeConcernCb)
    // checks if access token is either googleor facebook
  },

}