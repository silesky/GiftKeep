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
// get all
app.get('/api/', (req, res) => Storage.getAllData(res));
app.post('/api/user', (req, res) => Storage.createUser(req, res)); //parameters are reversed
// get user by token
app.get('/api/user/:token', (req, res) => Storage.getUser(req, res));
// get user data by token
app.get('/api/user/data/:token', (req, res) => Storage.getUserData(req, res));
// update user data by token
app.put('/api/user/:token', (req, res) => Storage.updateUserByAccessToken(req, res));
app.put('/api/user/data/:token', (req, res) => Storage.updateUserDataByAccessToken(req, res));
app.get("/oauthcallback", (req, res) => {
    console.log('req success', req.body);
    res.send("Authcallback get");
});

app.post("/api/auth/fb", (req, resCb) => {
    const { token } = req.body;
    console.log('fb auth post route hit... token', token);
    fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) return res.json();
            // no err, res.json() is always fulfilled
        })
        .catch(err => console.log('_____EEError: fetch failed', err.message))
        .then(res => {
            console.log('___res____', res);
            return Storage.createUserFromFb({ 
                userName: res.name,
                fbAccessToken: token, 
            }, resCb);
            //handles any fetch errors
        })
        .catch(err => console.log('_____Error: either the accesstoken is invalid (more likely), or mongo failed (less likely)', err))
}); 

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