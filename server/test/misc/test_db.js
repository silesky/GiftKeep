const { expect } = require('chai')

const config = require('../test_config.json')
const { DB_STRING } = config

module.exports = () =>
  describe('Stuff for Mocha to function:', () => {
    it('process.env to work accessible', () => {
      expect(config).to.have.property('DB_STRING')
    })
    it('test db should be available', done => {
      const MongoClient = require('mongodb').MongoClient
      MongoClient.connect(DB_STRING, (err, db) => {
        if (err) done(err)
        expect(db).to.be.ok
        done()
      })
    })
})


