require('es6-promise').polyfill()
require('isomorphic-fetch')

const AppInfo = require('../json/appInfo.json')
const { app_access_token, client_id, client_secret } = AppInfo
const TestUsers = require('../json/testUsers.json')

const FbTestUser = () => {
  const _getAppAccessToken = () => {
    // returns string access_token=336395990074206|ABCDEFG1234567
    return fetch(
      `https://graph.facebook.com/oauth/access_token?` +
        `&client_id=${client_id}` +
        `&client_secret=${client_secret}` +
        `&grant_type=client_credentials`
    )

      .then(res => res.text())
      .then(res => {
        const formattedToken = res.replace('access_token=', '')
        return formattedToken
      })
  }
  const _fBfetchTestUsers = appAccessToken => {
    return fetch(
      `https://graph.facebook.com/v2.8/336395990074206/accounts/test-users?` +
        `access_token=${appAccessToken}`
    ).then(res => res.json())
  }
  const _getTestUsers = () => {
    return _getAppAccessToken()
      .then(appAccessToken => _fBfetchTestUsers(appAccessToken))
  }
  return {
    getTestUserTokenByFbId: id => {
      return _getTestUsers().then(res => {
        if (res.error) {
          console.log(res.error)
        } else {
          const foundObj = res.data.find(el => el.id === id)
          return foundObj ? foundObj['access_token'] : false
        }
      })
    },

    getExistingUserToken: () => {
      const existingUserId = TestUsers.existing.fbId
      return FbTestUser().getTestUserTokenByFbId(existingUserId)
    },
    getNewUserToken: () => {
      const newUserId = TestUsers.new.fbId
      return FbTestUser().getTestUserTokenByFbId(newUserId)
    },
  }
}

// for debugging... just returns all the users
// FbTestUser().getTestUsers1().then(res => console.log('simple: should be a test users object', res))
// uses the
// FbTestUser().getTestUsers().then(res => console.log('getAll: should be a test users object', res));
FbTestUser().getExistingUserToken().then(res => {
  debugger
})
module.exports = FbTestUser

// FbTestUser().getNewAccessTokenByFbUserId(existing_user_id);
