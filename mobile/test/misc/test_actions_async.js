// test whether the correct action creator was called and
// whether the right action was returned.
const { expect}  = require('chai')
const sinon = require('sinon');
import user from './../../app/reducers/reducers';
import visible from './../../app/reducers/reducers';
const userReducer = user;
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import state from './../json/state.json'
const FbTestUser = require('./../lib/FbTestUser');
// import { store } from '../../app/stores/store';
import * as actions from './../../app/actions/actions';
import * as Util from './../../app/utils/utils';
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);
module.exports = () => {
  describe('TEST_ASYNC_ACTIONS', function () {
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
