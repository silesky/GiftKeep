const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient
chai.use(chaiHttp);
import * as Config from '../../config.json'
const dummyFbAccessToken = Config.fb.dummyAccessToken;
import { store } from '../app/stores/store';
import * as action from '../app/actions/actions';

const axxToken = "EAAEx80tZBA14BANtrO6wNlQtPQmw9l1CkszS6GnV8dZAOLWgb4WEYpMqZAqhpLeJzZB3TpRpDZBSoesLHrR5ZCpOiJvHgWMeZCin5zjbZC1DfQwiAIsndPJkZCL9XjPg8KSZBhjqe6tKqLgOow3PNL40JQZAi8KFzX70YTpZCl5E03q6awX7TH8MXRDPb09UCVZBuxGkFo514Tqzi8PEskQ4hZBHWeaOR3DmulDygZD"
const { expect, request } = chai
// check if user exists
// if access token exists, return data -
// otherwise return error
// if user doesn't exist, check if user is valid on facebook
// if facebook says success, then create a new user with the token


//const actions = require('./../app/actions/actions');
module.exports = () => {
  describe('CLIENT: Store, Actions', function() {
    this.timeout(() => console.log('done'), 2000)
    it('store should exist', () => {
      // an array of objects
      expect(store.getState().user).to.be.an.array
    }),
    it('when I login successfully, my redux store should populate', () => {
      store.dispatch(action.authTokenAndTryToGetUser(axxToken))
      // get dummy user so it gets the most recently added item... right now I have no way of knowing whether this is the most recent 
      expect(store.getState().user).to.have.property('data');
      //
      expect(store.getState().user.userName).to.be.ok;
      expect(store.getState().user.data[0]).to.have.property('friendName');
      expect(store.getState().user.data[0]).to.have.property('bday');
      expect(store.getState().user.data[0]).to.have.property('gifts');
    })
  })
}
