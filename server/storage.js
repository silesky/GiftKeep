const { userCollection, promiseConnect } = require('./db')
promiseConnect()
module.exports = {
  // get all
  getAllData: () => {
    return new Promise((resolve, reject) => {
      userCollection().find().toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  },
  // create user
  // temp? for debugging
  createUser: ({ body: { userName, fbId, googleIdToken, data } }, res) => {
    const userObj = {
      userName: userName,
      fbId: fbId,
      fbAccessToken: null,
      googleIdToken: googleIdToken,
      data: data,
    }
    try {
      userCollection().insert(userObj)
      res.json({
        success: true,
        msg: 'user created',
      })
    } catch (e) {
      res.json({
        success: false,
        error: e,
      })
    }
  },
  createUserFromGoogle: ({ userName, googleIdToken }, res) => {
    const userObj = {
      userName: userName,
      fbAccessToken: null,
      googleIdToken: googleIdToken,
      data: [],
    }
    try {
      userCollection().insert(userObj)
      res.json({
        success: true,
        msg: 'user created',
      })
    } catch (e) {
      res.json({
        success: false,
        error: e,
      })
    }
  },
  createUserFromFb: (userName, fbAccessToken, fbId) => {
    // should also return data
    const userObj = {
      userName: userName,
      fbAccessToken: fbAccessToken,
      fbId: fbId,
      googleIdToken: null,
      data: [], // no data
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

  getUserByAccessToken: token => {
    // TODO: refactor to use promises, like in getAlData
    return new Promise((resolve, reject) => {
      userCollection().find().toArray((err, docs) => {
        const results = docs.find(el => token === el.fbAccessToken)
        // if token is 5, expect it to return {user: john}
        if (results) {
          resolve(results)
        } else if (err) {
          reject(err)
        } else {
          reject('no results found')
        }
      })
    })
  },
  getUserByFbId: fbId => {
    // TODO: refactor to use promises, like in getAlData
    return new Promise((resolve, reject) => {
      userCollection().find().toArray((err, docs) => {
        const results = docs.find(el => fbId === el.fbId)
        if (results) {
          resolve(results)
        } else if (err) {
          reject(err)
        } else {
          reject('no db result found')
        }
      })
    })
  },

  // PUT
  updateUserByAccessToken: user => {
    return new Promise((resolve, reject) => {
      let { fbAccessToken, fbId, userName, googleIdToken, data } = user
      userCollection().update(
        { fbAccessToken: fbAccessToken },
        {
          $set: {
            username: userName,
            fbAccessToken: fbAccessToken,
            fbId: fbId,
            data: data,
          },
        },
        (err, records) => {
          if (err) {
            reject(err)
          } else if (!records.result.nModified && !records.result.n) {
            reject(
              'db ok, but no records modified or created. probably a wrong access token.'
            )
          } else {
            resolve(records.result)
          }
        }
      )
    })
  },
  // I probably don't need this method anymore
  updateAccessToken: (oldT, newT) => {
    // should be replaced with findAndModify
    return new Promise((resolve, reject) => {
      userCollection().update(
        { fbAccessToken: oldT },
        {
          $set: {
            fbAccessToken: newT,
          },
        },
        (err, records) => {
          if (err) {
            reject(err)
          } else if (!records.result.nModified && !records.result.n) {
            reject(
              'db ok, but no records modified or created. probably a wrong access token.'
            )
          } else {
            resolve(records.result)
          }
        }
      )
    })
  },
  // I probably don't need this method anymore
  updateAccessTokenByFbId: (fbId, newT) => {
    return new Promise((resolve, reject) => {
      userCollection().update(
        { fbId: `${fbId}` },
        {
          $set: {
            fbAccessToken: newT,
          },
        },
        (err, records) => {
          if (err) {
            reject(err)
          } else if (!records.result.nModified && !records.result.n) {
            reject(
              'db ok, but no records modified or created. probably a wrong access token.'
            )
          } else {
            resolve(records.result)
          }
        }
      )
    })
  },
}
