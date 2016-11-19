const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient

chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const Config = require('../config.json');
const userCollectionJSON = require('./../seeds/userCollection.json')
const dummyFbAccessToken = Config.fb.dummyAccessToken;

describe('HTTP METHODS', () => {
    let userCollection;
    before(() => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
            db.createCollection('userCollection')
            userCollection = db.collection('userCollection');
        })
    });
    after(() => {
        // clean up dummy data 
        userCollection.drop();
        userCollection.insert(userCollectionJSON);
    })
    describe('Db connection', () => {
        it('should connect to gifter db', () => {
            MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
                expect(db).to.be.ok
            })
        })
    }),
        describe('Get', () => {
            it('get: getAllData should get all the data', (done) => {
                request(serverUrl)
                    .get('/api')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array'); //each user is an object
                        done()
                    })
            })


            it('get: getUserByAccessToken should return user data (e.g username) if fb access token is valid.', (done) => {
                request(serverUrl)
                    .get(`/api/user/${dummyFbAccessToken}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(err).to.not.be.ok
                        expect(res.body).to.not.be.empty;
                        expect(res.body.success).to.be.true;
                        expect(res.body.data).to.have.property('_id');
                        expect(res.body.data).to.have.property('userName')
                        expect(res.body.data).to.have.property('data')
                        expect(res.body.data).to.have.property('fbAccessToken')
                        expect(res.body.data).to.be.an.array;
                        done();
                    })
            }),

                it('get: getUserByAccessToken should fail if an access token is invalid', (done) => {
                    request(serverUrl)
                        .get(`/api/user/iNVALiDAXXToken`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(err).to.be.falsy;
                            expect(res.body.success).to.be.false;
                            done();
                        })
                }),


                it('get: getUserDataByAccessToken should return user data (i.e friends) if fb access token is valid.', (done) => {
                    request(serverUrl)
                        .get(`/api/user/data/${dummyFbAccessToken}`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(err).to.be.falsy;
                            expect(res.body.success).to.be.true;
                            expect(res.body.data).to.be.an.array // array of friends
                            expect(res.body.data[0]).to.have.property('friendName');
                            expect(res.body.data[0]).to.have.property('gifts');
                            expect(res.body.data[0].gifts[0]).to.have.property('giftName');
                            done();
                        })
                }),
                it('get: getUserDataByAccessToken should fail if an access token is invalid', (done) => {
                    request(serverUrl)
                        .get(`/api/user/data/iNVALiDAXXToken`)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(err).to.be.falsy;
                            expect(res.body.success).to.be.false;
                            done();
                        })
                })
        }),
        describe('Post: Request to create new user', () => {
            it('post: request to create new user should create user if fb access token is valid AND no user is the database.', (done) => {
                request(serverUrl)
                    .post('/api/auth/fb')
                    .send({ token: Config.fb.accessToken })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.not.be.empty;
                        expect(res.body).to.be.a('object');
                        expect(err).to.not.be.ok
                        done();
                    })
            })
        }),

        it('post: request to create new user should fail if access token is invalid.', (done) => {
            request(serverUrl)
                .post('/api/auth/fb')
                .send({ token: 'fakeACCESSTOKEN' })
                .end((err, res) => {
                    expect(err).to.be.falsy;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.false;
                    done();
                })
        })
    describe('Put: update user data by fb access token', () => {
        it('should update user data if access token is valid', (done) => {
            request(serverUrl)
                // put might not work
                .put(`/api/user/data/${dummyFbAccessToken}`)
                .send({ data: Math.random() })
                .end((err, res) => {
                    expect(err).to.be.falsy;
                    expect(res).to.have.status(200);
                    expect(res.body).to.exist;
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true
                    done();
                })
        })
    })
    // check if user exists
})