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
      MongoClient.connect(process.env.DB_HOST, (err, db) => {
        db.createCollection('userCollection')
        userCollection = db.collection('userCollection');
        userCollection.remove({});
        userCollection.insert(userCollectionJSON);
      })
    });



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
     
        it('if user is new, should 1.) create user, 2.) return a user object (assuming token is ok).', (done) => {
          FbTestUser().getNewUserToken().then(newUserToken => {
            request(serverUrl)
              .post('/api/auth/fb')
              .send({ token: newUserToken })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.empty;
                expect(res.body.success).to.be.true
                expect(res.body.payload).to.be.an.array;
                expect(res.body.message).to.equal('user created');
                expect(err).to.not.be.ok
                done();
              })
            })
        }),
        it('if the just created tries to log in again, it should say user exists', (done) => {
          FbTestUser().getNewUserToken().then(newUserToken => {
            request(serverUrl)
              .post('/api/auth/fb')
              .send({ token: newUserToken })
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('user exists');
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

      describe('/api/user/ PUT --> update user data by fb access token', () => {

        it('should find and update the user with the given token', (done) => {
          request(serverUrl)
            // put might not work
            .put(`/api/user/`)
            .send({"user": {"fbAccessToken": "f1","name": "updated!"}})
            .end((err, res) => {
              if (err) console.log(err)
              expect(err).to.be.falsy;
              expect(res).to.have.status(200);
              expect(res.body.success).to.be.true;
              done();
            })
     
        }) 
      })
  })

    // check if user exists