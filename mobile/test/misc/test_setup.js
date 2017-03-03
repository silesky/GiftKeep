import { expect } from 'chai'

export const FbTestUser = require('./../lib/FbTestUser')
module.exports = () => {
  describe('SETUP', () => {
    it('[online] FbTestUser().getExistingUserToken() should retrieve a super-long accesss token string', (done) => {
      FbTestUser().getExistingUserToken()
        .then(res => {
          expect(res).to.be.a('string') // token
          expect(res.length).to.be.above(20)
          done()
        }).catch(done)
    })
    it('[online] internet should be connected', (done) => {
      fetch('http://google.com').then(res => {
        expect(res.status).to.equal(200)
        done()
      }).catch(done)
    })
  })
}
