const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient

chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const Config = require('../config.json');
const userCollectionJSON = require('./../seeds/userCollection.json')
const dummyFbAccessToken = Config.fb.dummyAccessToken;

describe('Get behavior', () => {
    before(() => { 
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
            db.createCollection('userCollection')

            const userCollection = db.collection('userCollection');
            userCollection.drop();
            userCollection.insert(userCollectionJSON)
        })
    });
    it('db should connect to gifter db', () => {
          MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
             expect(db).to.be.ok
          })
    }),
    it('get: get_all_data should work', (done) => {
        request(serverUrl)
        .get('/api')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array'); //each user is an object
            done()
        })
    }),
    it('get: getUserByAccessToken (fb)', (done) => {
        request(serverUrl)
        .get(`/api/user/${dummyFbAccessToken}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(err).to.not.be.ok
            expect(res.body).to.not.be.empty;
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('userName')
            expect(res.body).to.have.property('data')
            expect(res.body).to.have.property('fbAccessToken')
            expect(res.body.data).to.be.an.array;
            done();
        })
    }),
    it('get: getUserDataByAccessToken (fb)', (done) => {
        request(serverUrl)
        .get(`/api/user/data/${dummyFbAccessToken}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(err).to.not.be.ok
            expect(res.body).to.not.be.empty;
            expect(res.body).to.be.an.array; // array of friends
            expect(res.body[0]).to.have.property('friendName');
            expect(res.body[0]).to.have.property('gifts');
            expect(res.body[0].gifts[0]).to.have.property('giftName');
            done();
        })
    }),
    
    it('create new user from fb token', (done) => {
        request(serverUrl)
        .post('/api/auth/fb')
        .send({token: Config.fb.accessToken})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.empty;
            expect(res.body).to.be.a('object');
            expect(err).to.not.be.ok
            done();
        })
    }),

    it('update user data by fb access token', (done) => {
        request(serverUrl)
        // put might not work
        .put(`/api/user/data/${dummyFbAccessToken}`)
        .send({data: Math.random()})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(err).to.not.be.ok
            expect(res.body).to.exist;
            expect(res.body).to.be.a('object');
            expect(res.body.success).to.be.true
            done();
        })
    })

    // check if user exists
})