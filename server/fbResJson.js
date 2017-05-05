module.exports = fbResJsonFunc = (fbResJson, token, resCb) => {
  if (fbResJson.success) {
    // getFacebookId
    // can
    fetch(`${localUrl}/api/user/f1`)
      .then(dbRes => dbRes.json())
      .then(dbResJson => {
        if (!dbResJson.success) {
          resCb.json({
            success: false,
            message: 'no user found',
            error: dbResJson.error.message,
          })
        }
        if (dbResJson.success) {
          Storage.createUserFromFb(
            { userName: dbResJson.name, fbAccessToken: token },
            resCb
          )
        }
        return dbResJson
      })
  }
}
