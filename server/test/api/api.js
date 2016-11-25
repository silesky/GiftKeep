const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient
chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const userCollectionJSON = require('./../../seeds/userCollection.json')
// for get

const FbTestUser = require('./../lib/FbTestUser');

module.exports = () =>

  describe('API -->', () => {
    let userCollection;
    before(() => {
      MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
        db.createCollection('userCollection')
        userCollection = db.collection('userCollection');
        userCollection.remove({});
        userCollection.insert(userCollectionJSON);

        //console.log(FbTestUser.getNewAccessTokenByFbUserId());

      })

    });

    describe('Database Connection -->', () => {
      it('should connect to gifter db', () => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
          expect(db).to.be.ok
        })
      })
    }),

      describe('/api/ -->', () => {
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
        describe('/api/user/ -->', () => {
          it('get: getUserByAccessToken should return existing user', (done) => {
            request(serverUrl)
              .get(`/api/user/f1`)
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


      describe('login --> /api/auth/fb POST --> ', () => {
     
        beforeEach(() => {
        
    // ???
        })
      
        it('if user is new, should 1.) create user, 2.) return a user object (assuming token is ok).', (done) => {
          FbTestUser().getNewUserToken().then(newUserToken => {
            request(serverUrl)
              .post('/api/auth/fb')
              .send({ token: newUserToken })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.empty;
                expect(res.body.message).to.equal('user created');
                expect(res.body.payload).to.have.property('userName');
                expect(err).to.not.be.ok
                done();
              })
            })
        }),
          it('if user is coming back, grab their data from the db (assuming token is ok)', (done) => {
              FbTestUser().getExistingUserToken().then(existingUserToken => {
                request(serverUrl)
                  .post('/api/auth/fb')
                  .send({token: existingUserToken })
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
          it('should fail if token is bad.', (done) => {
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
      }),

      describe('/api/user/data/ PUT --> update user data by fb access token', () => {
        it('should update user data if access token is valid', (done) => {
          request(serverUrl)
            // put might not work
            .put(`/api/user/data/f1`)
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
  })

    // check if user exists