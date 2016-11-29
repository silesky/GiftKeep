const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient
chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const userCollectionJSON = require('./../../seeds/userCollection.json')
// for get
const storage = require('./../../storage')

module.exports = () => {
    
 describe('STORAGE', () => {
  let userCollection;
  before(() => {
      MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
        db.createCollection('userCollection')
        userCollection = db.collection('userCollection');
        userCollection.remove({});
        userCollection.insert(userCollectionJSON);
      })
    })
        describe('Database Connection -->', () => {
      it('should connect to gifter db', () => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, db) => {
          expect(db).to.be.ok
        })
      })
    })
   describe('updateUserByAccessToken,', () => {
    it('given the old access token, it should update the new one', (done) => {
      const oldToken = 'f1'
      const newToken = 'UPDATEDACCESSTOKEN'
      storage.updateAccessToken('f1', 'zzzz')
      .then(res => console.log('#####', res))
      .catch(done);
    })
   });
 }); 
}