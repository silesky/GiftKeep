const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const Storage = require('./storage');
const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('./public'));
Storage.connect();

let localUrl = "http://localhost:3000";
// get all
app.get('/api/', (undefined, resCb, next) => {
     Storage.getAllData()
     .then(allData => {
          resCb.json(allData)
     })
     .catch(next)
})
app.post('/api/user', (req, res) => Storage.createUser(req, res)); //parameters are reversed
// get user by token
app.get('/api/user/:token', ({params:{token}}, res) => Storage.getUserByAccessToken(token, res));
// get user data by token
app.get('/api/user/data/:token', ({params:{token}}, res) => Storage.getUserDataByAccessToken(token, res));
// update user data by token
app.put('/api/user/data/:token', ({params:{token}, body: {data}}, res) => {
    Storage.updateUserDataByAccessToken(token, data, res);
})
// google id
app.get("/oauthcallback", (req, res) => {
    console.log('req success', req.body);
    res.send("Authcallback get");
});


// check if user is in database... if true, return data.
// if user is not in database, ask facebook if token is valid. 
// if token is valid, create new user. if token is invalid, error message.
app.post("/api/auth/fb", (req, resCb) => {
    const { token } = req.body;
    console.log('post: api/auth/fb... token: ', token);
    const validateThisToken = `https://graph.facebook.com/me?access_token=${token}`;
    fetch(validateThisToken)
        .then((fbRes) => fbRes.json()).then(fbResJson => {
            // nothing found in facebook
            if (fbResJson.error) resCb.json({success: false, error: fbResJson.error.message})
            return {success: true, data: fbResJson};
        })
        // once authneticated, grab userId too
        .then(fbResJson => {
            if (fbResJson.success) {
                //getFacebookId
                // can
                fetch(`${localUrl}/api/user/f1`)
                    .then(dbRes => dbRes.json()).then(dbResJson => {
                        if (!dbResJson.success) resCb.json({success: false, message: 'no user found', error: dbResJson.error.message})
                        if (dbResJson.success)  Storage.createUserFromFb({ userName: dbResJson.name, fbAccessToken: token }, resCb)
                        return dbResJson
                      })
            }
        })
        .catch(err => resCb.json({success: false, message: 'caught! mongo could have failed.', error: err}))
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

app.listen(3000);
console.log("listening on http://gifter.sethsilesky.com:3000");