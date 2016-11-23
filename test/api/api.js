const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient
chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const userCollectionJSON = require('../../seeds/userCollection.json')
const Config = require('../../config.json');
const existingUserToken = Config.fb.dummy.new.token;

const FbTestUser = require('../lib/FbTestUser');


module.exports = () => describe('API (INTEGRATION)', function () {
  let userCollection;
  before(() => {
    MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
      db.createCollection('userCollection')
      userCollection = db.collection('userCollection');
      userCollection.remove({});
      userCollection.insert(userCollectionJSON);
      console.log(FbTestUser.getInfo());

    })
    const existingUserToken = FbTestUser.getAllUsers();
    console.log(existingUserToken);
  });
  
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
            expect(res.body.success).to.be.true;
            expect(res.body.payload).to.be.an.array; //each user is an object
            done();
          })
      }),
        it('get: getUserByAccessToken should return user data (e.g username).', (done) => {
          request(serverUrl)
            .get(`/api/user/${existingUserToken}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(err).to.not.be.ok
              expect(res.body).to.not.be.empty;
              expect(res.body.success).to.be.true;
              expect(res.body.payload).to.have.property('_id');
              expect(res.body.payload).to.have.property('userName')
              expect(res.body.payload).to.have.property('data')
              expect(res.body.payload).to.have.property('fbAccessToken')
              expect(res.body.payload).to.be.an.array;
              done();
            })
        }),

        // it('get: getUserByAccessToken should succeed if an access token is good ', (done) => {
        //     request(serverUrl)
        //         .get(`/api/user/f1`)
        //         .end((err, res) => {
        //              expect(res).to.have.status(200);
        //                 expect(err).to.be.falsy;
        //                 expect(res.body.success).to.be.true;
        //                 expect(res.body.payload).to.have.property('fbAccessToken')
        //                 expect(res.body.payload).to.have.property('fbId')

        //         })
        // }),

        it('get: getUserByAccessToken should fail if an access token is bad', (done) => {
          request(serverUrl)
            .get(`/api/user/iNVALiDAXXToken`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(err).to.be.falsy;
              expect(res.body.success).to.be.false;
              done();

            })
        })
    }),


    describe('A new user wants to log in', () => {
      it('post: should create user + return a fresh object if user is new (and token is good).', (done) => {
        request(serverUrl)
          .post('/api/auth/fb')
          .send({ token: existingUserToken })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.empty;
            expect(res.body.success).to.be.true;
            expect(res.body.payload).to.have.property('userName');
            expect(err).to.not.be.ok
            done();
          })
      })
    }),
    describe('An existing user logs back in', () => {
      it('post: should return existing user object user if user in db (and token is good)', (done) => {
        request(serverUrl)
          .post('/api/auth/fb')
          .send({ token: existingUserToken })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.empty;
            expect(res.body.success).to.be.true;
            expect(res.body.payload).to.have.property('userName');
            expect(err).to.not.be.ok
            done();
          })
      })
    })
}),
  describe('A user tries to log in after being rejected by facebook', () => {
    it('post: should fail if token is bad.', (done) => {
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
  })
describe('Put: update user data by fb access token', () => {
  it('should update user data if access token is valid', (done) => {
    request(serverUrl)
      // put might not work
      .put(`/api/user/data/${existingUserToken}`)
      .send({ data: Math.random() })
      .end((err, res) => {
        expect(err).to.be.falsy;
        expect(res).to.have.status(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.a('object');
        expect(res.body.success).to.be.true;
        done();
      })
  })
})
    // check if user exists