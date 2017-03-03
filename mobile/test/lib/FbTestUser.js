require('es6-promise').polyfill()
require('isomorphic-fetch')
const AppInfo = require('../json/appInfo.json')
const { app_access_token, client_id, client_secret } = AppInfo
const TestUsers = require('../json/testUsers.json'),
  existingUserId = TestUsers.existing.fbId,
  newUserId = TestUsers.new.fbId

const FbTestUser = () => {
  const _getAppAccessToken = () => {
    // returns string access_token=336395990074206|ABCDEFG1234567
    return fetch(`https://graph.facebook.com/oauth/access_token?` +
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
  const _fbGetUserPhoto = (userId) => {
    return fetch(`https://graph.facebook.com/v2.8/${userId}/picture`)
    .then(res => res.json())
  }

  const _fbFetchTestUsers = (appAccessToken) => {
    return fetch(`https://graph.facebook.com/v2.8/336395990074206/accounts/test-users?` +
      `access_token=${appAccessToken}`).then(res => res.json())
  }
  const _getTestUsers = () => {
    return _getAppAccessToken()

      .then((appAccessToken) => _fbFetchTestUsers(appAccessToken))
      .catch(err => console.log({ success: false, message: 'facebook failed to return data. check access token.', error: err }))
  }
  return {
    getExistingUserPhotoByFbId: () => _fbGetUserPhoto(existingUserId),
    getTestUserTokenByFbId: (id) => {
      return _getTestUsers()
          .then(fbTestUser => {
            const foundObj = fbTestUser.data.find(el => el.id === id)
            if (foundObj) {
              return foundObj['access_token']
            } else {
              throw new Error('FB response ok, but no user with that access token found')
            }
          })
    },
    getExistingUserToken: () => FbTestUser().getTestUserTokenByFbId(existingUserId),
    getNewUserToken: () => FbTestUser().getTestUserTokenByFbId(newUserId)
  }
}
// for debugging... just returns all the users
// FbTestUser().getTestUsers1().then(res => console.log('simple: should be a test users object', res))
// uses the
// FbTestUser().getTestUsers().then(res => console.log('getAll: should be a test users object', res));
FbTestUser().getExistingUserToken()
    .then(res => {
      debugger
    })

// FbTestUser().getNewUserToken().then(res => console.log('should be an access token for a new user', res));

module.exports = FbTestUser

// FbTestUser().getNewAccessTokenByFbUserId(existing_user_id);
