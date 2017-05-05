const fetch = require('node-fetch')
module.exports = {
  fbGetUserPhoto: userId => {
    return fetch(
      `https://graph.facebook.com/v2.8/${userId}/picture`
    ).then(res => res.json())
  },
}
