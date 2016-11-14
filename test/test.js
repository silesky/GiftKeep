const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect, request } = chai;
const serverUrl = "http://localhost:3000/api"
const Config = require('../config.json');
// const serverUrl = require('../config.json').serverUrl;
describe('Get behavior', () => {
    it('get: get_all_data should work', (done) => {
        request(serverUrl)
        .get('/')
        .end((err, res) => {
                expect(res.body).to.exist;
                expect(res.status).to.equal(200);
            done()
        })
    })
    it('create new user from fb', (done) => {
        request(serverUrl)
        .post('/auth/fb')
        .send({token: Config.fb.accessToken})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(err).to.not.be.ok
            done();
        })
    })
    // check if user exists
})