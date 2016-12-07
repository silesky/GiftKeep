const api = require('./misc/test_api');
const storage = require('./misc/test_storage');
const { expect } = require('chai');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();
describe('Stuff for Mocha to function:', () => {
  it('process.env.DB_HOST should be accessible', () => {
    expect(process.env).to.have.property('DB_HOST');
  }),
  it('gifter db should be available', () => {
    MongoClient.connect(process.env.DB_HOST, (err, db) => {
      expect(db).to.be.ok
    })
  })
})

api();
storage();


