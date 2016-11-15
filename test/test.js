const chai = require('chai')
const chaiHttp = require('chai-http');
let db = require('mocha-mongodb');

chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000"
const Config = require('../config.json');
const userCollectionJSON = require('./../seeds/userCollection.json')
// const serverUrl = require('../config.json').serverUrl;
describe('Get behavior', () => {
    before(() => { 
        db.connect('mongodb://127.0.0.1:27017/giftr')
        // isn't exactly the right tool for the job, might just use vanilla mongo'
        console.log('i run before')
    });
    it('get: get_all_data should work', (done) => {
        request(serverUrl)
        .get('/api')
        .end((err, res) => {
                expect(res.body).to.exist;
                expect(res).to.have.status(200);
            done()
        })
    }),
    it('create new user from fb token', (done) => {
        request(serverUrl)
        .post('/api/auth/fb')
        .send({token: Config.fb.accessToken})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.exist;
            expect(err).to.not.be.ok
            done();
        })
    }),

    it('update user data by fb access token', (done) => {
        request(serverUrl)
        // put might not work
        .put(`/api/user/data/f1`)
        .send({data: Math.random()})
        
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(err).to.not.be.ok
            expect(res.body.success).to.be.true
            done();
        })
    })

    // check if user exists
})