const chai = require('chai')
const MongoClient = require('mongodb').MongoClient
const { expect, request } = chai;
const storage = require('./../../storage')

module.exports = () => describe('STORAGE', function () { // use function declaration so this.timeout works
    before(() => {
      this.timeout(3000);
    })
    describe('updateUserByAccessToken,', () => {
      it('given the old access token, it should update the new one', (done) => {
        const oldToken = 'f1'
        const newToken = 'UPDATEDACCESSTOKEN'
        storage.updateAccessToken('f1', 'zzzz')
          .then(res => {
            const expectedMongoResObj = { ok: 1, nModified: 1, n: 1 };
            expect(res).to.be.an.object;
            expect(res).to.deep.equal(expectedMongoResObj);
            done();
          })
          .catch(done)
      })
    });

  });

