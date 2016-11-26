const chai = require('chai')
const chaiHttp = require('chai-http');
const { expect, request } = chai
const MongoClient = require('mongodb').MongoClient
const sinon = require('sinon');
chai.use(chaiHttp);
const { getNewAccessTokenByFbUserId } = require('./../lib/FbTestUser');
import { store } from '../../app/stores/store';
const { 
  authTokenAndTryToGetUser 
  } = require('./../../app/actions/actions');



module.exports = () => {
  describe('CLIENT: Store, Actions', function() {
    // this.timeout(() => console.log('done'), 2000)
    it('store should exist', () => {
      expect(store.getState().user).to.be.an.array
    }),
    it('when I login successfully, my redux store should populate', () => {
      getNewAccessTokenByFbUserId().then(id => {  
        store.dispatch(authTokenAndTryToGetUser(123));
        expect(store.getState().user).to.have.property('data');
      expect(store.getState().user.userName).to.be.ok;
      expect(store.getState().user.data[0]).to.have.property('friendName');
      expect(store.getState().user.data[0]).to.have.property('bday');
      expect(store.getState().user.data[0]).to.have.property('gifts');
      })
      // get dummy user so it gets the most recently added item... right now I have no way of knowing whether this is the most recent 
      
    })
    it('when I log out, clear localStorage', () => {
      
    });
  })
}
