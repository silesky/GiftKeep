const fetch = require('node-fetch');
const Config = require('../../config.json'), 
client_id = Config.fb.clientId, 
client_secret = Config.fb.clientSecret;

const FbTestUser = (() => {
  const _getAppAccessToken = (clientId, clientSecret) => {
    //returns string access_token=336395990074206|ABCDEFG1234567
    return fetch(`https://graph.facebook.com/oauth/access_token?`
      + `grant_type=client_credentials`
      + `&client_id=${clientId}`
      + `&client_secret=${clientSecret}`
    )
  }
  const _getTestUsersByAccessToken = (appAccessToken) => {
    return fetch(`https://graph.facebook.com/v2.8/336395990074206/accounts/test-users?`)
      + `access_token=${appAccessToken}`
  }

  return {
    getAllUsers: (clientId = client_id, clientSecret = client_secret) => {
      return _getAppAccessToken(clientId, clientSecret)
        .then(({body: {tokenString}}) => {
          let token = tokenString.replace('access_token');
          _getTestUsersByAccessToken(token)
            .then(testUsersObj => {
              return testUsersObj
            })
        })
    },
    getNewAccessTokenByFbUserId: (fbId) => {
      return this.getAllUsers().then(testUsersObj => {
        //testUserObj.data.find //???
        console.log(testUsersObj)
      })
    }
  }
  })()

  module.exports = FbTestUser;