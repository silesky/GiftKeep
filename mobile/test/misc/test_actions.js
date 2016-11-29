const chai = require('chai')
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiHttp, chaiAsPromised);

const { expect, request } = chai
import thunk from 'redux-thunk';
import nock from 'nock'
import configureMockStore from 'redux-mock-store';
const initialState = require('../../app/json/initialState.json')

const FbTestUser = require('./../lib/FbTestUser');
// import { store } from '../../app/stores/store';
import * as actions from './../../app/actions/actions';
import * as Util from './../../app/utils/util';
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

module.exports = () => {
  describe('CLIENT: Store, Actions', function () {
    // this.timeout(() => console.log('done'), 2000)
    it('store should exist', () => {
      const state = store.getState();
      expect(state).to.be.an.object
      expect(state).to.have.property('userName');
      expect(state).to.have.property('fbId');
      expect(state).to.have.property('fbAccessToken');
      expect(state).to.have.property('data');
    }),
      describe('lib: FbTestUser().getExistingUserToken()', () => {
        after(() => store.clearActions());
        it('should retrieve a super-long accesss token string', (done) => {
          FbTestUser().getExistingUserToken()
            .then(res => {
              expect(res).to.be.a('string'); // token
              expect(res.length).to.be.above(20);
              done();
            }).catch(done)
        })
      })
    it('when authTokenAndTryToGetUser() is called, hydrate_user action should be dispatched', (done) => {
      const callback = sinon.spy();
      FbTestUser().getExistingUserToken()
      .then(existingUserToken => {
        store.dispatch(actions.authTokenAndTryToGetUser(existingUserToken))
        .then(() => {
            const actions = store.getActions();
            // all this means that it it dispatched a certain actions
            const resUserObj = actions[0].payload;
            expect(actions[0].type).to.equal('HYDRATE_USER');
            expect(resUserObj).to.be.an.object;

            expect(resUserObj['fbAccessToken']).to.equal(existingUserToken);
            expect(resUserObj['userName']).to.equal('Existing User');
            callback();
            done();
          }).catch(err => console.log(err))
          .then(() => { expect(callback.called).to.be.true })
      })
        .catch(done)
    })

    it('when I log out, clear localStorage', () => {
      //    console.log(store.getState());

    });
  })
}
