const chai = require('chai')
const MongoClient = require('mongodb').MongoClient
const { expect, request } = chai;
// const serverUrl = "http://localhost:3000"
const userCollectionJSON = require('./../../seeds/userCollection.json')
const storage = require('./../../storage')
const DB = require('./../../db');
const { DB_STRING } = require('../test_config.json')
module.exports = () => describe('STORAGE', function () { // use function declaration so this.timeout works
    let userCollection;
    before((done) => {
  // broken because it's trying to connect to mongo and failing
      this.timeout(3000);
      MongoClient.connect(DB_STRING, (err, db) => {
        if (err) done(err)
        db.createCollection('userCollection')
        userCollection = db.collection('userCollection');
        userCollection().remove({});
        userCollection().insert(userCollectionJSON);
      })
    })

    describe('Database Connection -->', () => {
      it('should connect to gifter db', () => {
        MongoClient.connect(DB_STRING, (err, db) => {
          expect(db).to.be.ok
        })
      })
    })

    describe('updateUserByAccessToken,', () => {

      it('given the old access token, it should update the new one', (done) => {

        const oldToken = 'f1'
        const newToken = 'UPDATEDACCESSTOKEN'
        storage.updateAccessToken('f1', 'zzzz')
          .then(res => {
            const expectedMongoResObj = { ok: 1, nModified: 1, n: 1 };
            //expects { ok: 1, nModified: 1, n: 1 }
            expect(res).to.be.an.object;
            expect(res).to.deep.equal(expectedMongoResObj);
            // done callback makes
            done();
          })
          // if error, don't timeout
          .catch(done)
      })
    });

  });

