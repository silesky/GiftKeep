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
import * as actions from './../../app/actions/'
import * as Util from './../../app/utils/utils';
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);
module.exports = () => {
  describe('TEST_ASYNC_ACTIONS-->', function () {
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
    it('[server] hydrate_user action should be dispatched, and response should carry with it the new access token (and user data)', (done) => {
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
              expect(resUserObj['userName']).to.equal('Existing User'); // 'Existing User' is in mongodb and totally subject to change
              callback();
            })
        .then(() => {
          expect(callback.called).to.be.true
          done()
        }).catch(done)
      }).catch(done)
    })
    describe('Events: Add to New / add to existing / Update -->', () => {

      // - adding new events to an existing friend (isUpdating = true)
      // - adding new events to a new friend (isUpdating = false)
      // - updating an existing event for an existing friend (isUpdating = true)
      let newState;
      let newEventsArr;
      let newEvent;
      const existingFriendId = state.user.data[0].friendId;
      const existingEventArr = state.user.data[0].events
      const eventNameToCreate = "eventNameToCreate";
      const eventDateToCreate = "eventDateToCreate";     
       before(() => {
        newState = userReducer(state, actions.clear())
        newState = userReducer(state, actions.resetAll());
        const friendFormAddEvent = actions.friendFormAddEvent(existingFriendId, eventNameToCreate, eventDateToCreate );
        newState = userReducer(state, friendFormAddEvent)
          newEventsArr = newState.user.data[0].events; // each friend has an events array
          newEvent = newEventsArr[newEventsArr.length - 1];
        })
       it ('should add a new event to the state (if adding new event to existing friend, isUpdating = true) ', () => {
        expect(newEventsArr.length).to.be.above(existingEventArr.length);
        expect(newEvent).to.be.an.object;
      });
       it('the new event should have the right name (if adding new event to existing friend, isUpdating = true)', () => {
        expect(newEvent).to.have.property('eventName');
        expect(newEvent.eventName).to.equal(eventNameToCreate);
      })
       it('the new event should have an eventDate (if adding new event to existing friend, isUpdating = true)', () => {
        expect(newEvent).to.have.property('eventDate');
        expect(newEvent.eventDate).to.equal(eventDateToCreate);
      });
     })

  })
}
