const chai = require('chai')
const sinon = require('sinon');
import user from './../../app/reducers/reducers';
import visible from './../../app/reducers/reducers';
const userReducer = user;
const { expect } = chai
import thunk from 'redux-thunk';
import nock from 'nock'
import configureMockStore from 'redux-mock-store';
import state from './../json/state.json'
const FbTestUser = require('./../lib/FbTestUser');
// import { store } from '../../app/stores/store';
import * as actions from './../../app/actions/actions';
import * as Util from './../../app/utils/utils';
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);
module.exports = () => {
  describe('test_actions.js', function () {
    after(() => store.clearActions());
    // this.timeout(() => console.log('done'), 2000)
    it('store should exist', () => {
      const state = store.getState();
      expect(state).to.be.an.object
      expect(state.user).to.have.property('userName');
      expect(state.user).to.have.property('fbId');
      expect(state.user).to.have.property('fbAccessToken');
      expect(state.user).to.have.property('data');
    });
    describe('authTokenAndTryToGetUser() ', () => {
      it('lib: FbTestUser().getExistingUserToken() should retrieve a super-long accesss token string', (done) => {
        FbTestUser().getExistingUserToken()
          .then(res => {
            expect(res).to.be.a('string'); // token
            expect(res.length).to.be.above(20);
            done();
          }).catch(done)
      })
    })
      it('internet should be connected', (done) => {
        fetch('http://google.com').then(res => {
          expect(res.status).to.equal(200)
          done();
        }).catch(done);
      })
      it('hydrate_user action should be dispatched, and response should carry with it the new access token (and user data)', (done) => {
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
              })
              .then(() => {
                expect(callback.called).to.be.true
                done()
              }).catch(done)
          }).catch(done)
      })
      describe('Events:', () => {
        before(() => {
          this.existingFriendId = state.user.data[0].friendId;
          this.eventNameToCreate = "Birthday";
          this.eventDateToCreate = "06-06";
          const addEvent = actions.addEvent(
            this.existingFriendId, 
            this.eventNameToCreate, 
            this.eventDateToCreate
           );
          this.newState = userReducer(state, addEvent)
          const eventsArr = this.newState.user.data[0].events; // each friend has an events array
          this.addedEvent = eventsArr[eventsArr.length - 1];
        })
        afterEach(() => {
          this.newState = userReducer(state, actions.clear())
        });
        it('addEvent() should add an event name', () => {
          expect(this.addedEvent.eventName).to.equal(this.eventNameToCreate);
        })
        it('addEvent() should add an event date', () => {
          expect(this.addedEvent.eventDate).to.equal(this.eventDateToCreate);
        });
      })
    })
}
