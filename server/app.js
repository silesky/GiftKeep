const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const Storage = require('./storage');
const fs = require('fs');
const https = require('https');
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
Storage.connect();

// get all
app.get('/api', (undefined, resCb, next) => {
  Storage.getAllData()
    .then(allData => {
      resCb.json({
        success: true,
        payload: allData
      })
    })
    .catch(err => resCb.json({ success: false, error: err }))
    .catch(next)
})
app.post('/api/user', (req, res) => Storage.createUser(req, res)); //parameters are reversed
// get user by token 

app.get('/api/user/:token', ({params: {token}}, resCb, next) => {
  Storage.getUserByAccessToken(token)
    .then((user) => {
      resCb.json({ success: true, payload: user })
    })
    .catch(err => {
      resCb.json({
        success: false,
        error: err
      })
    })
    .catch(next)
})
// get user data by token
app.get('/api/user/data/:token', ({params: {token}}, resCb, next) => {
  Storage.getUserByAccessToken(token).then((user) => {
    resCb.json({ success: true, payload: user['data'] })
  })
    .catch(err => {
      resCb.json({
        success: false,
        message: 'Unable to return user Data.',
        error: err
      })
    })
    .catch(next);
});


// update user by token
app.put('/api/user/', (req, resCb) => {
  // given the current user update it
  const { user } = req.body;
  Storage.updateUserByAccessToken(user)
  .then(successMsg => {
     resCb.json({success: true, message: successMsg})
  })
  .catch(err => resCb.json({success: false, error: err, yourObj: user}))
})


// check if user is in database... if true, return data.
// if user is not in database, ask facebook if token is valid. 
// if token is valid, create new user. if token is invalid, error message.
app.post("/api/auth/fb", (req, resCb, done) => {
  const { token } = req.body;

  const validateThisToken = `https://graph.facebook.com/me?access_token=${token}`;
  fetch(validateThisToken)
    .then((fbRes) => fbRes.json()).then(fbRes => {
      // nothing found in facebook
      if (fbRes.error) {
        resCb.json({ success: false, error: fbRes.error.message })
      } else {
        return { success: true, payload: fbRes };
      }
    })
    // once authneticated, grab userId too
    .then(fbRes => {
      if (fbRes.success) {
        const { id, name } = fbRes.payload;
        Storage.getUserByFbId(id)
          .then((dbUserObj) => {
            resCb.json({
              success: true,
              message: 'user exists',
              payload: dbUserObj
            }) // if user exists in db

          })
          .catch((err) => {
            // TODO: if success = true
            if (err === 'no db result found') {
              Storage.createUserFromFb(name, token, id);
              resCb.json({
                success: true,
                message: 'user created',
                payload: {
                  userName: fbRes.name,
                  fbId: fbRes.id,
                  fbAccessToken: token,
                  data: []
                }
              })
            } else {
              resCb.json({ success: false, error: err })
            }
          })
      }
    })
    .catch(err => resCb.json({ success: false, message: 'caught! mongo could have failed.', error: err }))
    .catch(done);
})
// gifter.sethsilesky.com:3000/oauthcallback
app.post('/oauthcallback', (req, resCb) => {
  const { token } = req.body;
  console.log('post request recieved...');
  if (!req.body) return resCb.sendStatus(400);
  const validateThisToken = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
  fetch(validateThisToken).then((res) => {
    //'Content-Type', 'application/x-www-form-urlencoded'
    if (res.status < 300) {
      console.log('token validated! statusText:', res.statusText);
      return res.json()
    } else {
      console.log('token invalid! statusText:', res.statusText);
    }
  }).then(res => {
    console.log('res.json().name', res.name);
    Storage.createUserFromGoogle({
      userName: `google:${res.name}`,
      googleIdToken: token,
      // Right now, it deletes the current data if a user logs in
    }, resCb)
      .catch(err => console.log('_____EEError: google failed', err))
  });
})
// https.createServer({
//     key: fs.readFileSync('./server.key'),
//     cert: fs.readFileSync('./server.crt')
// }, app).listen(3000);
app.listen(3000);
console.log("listening on http://gifter.sethsilesky.com:3000");