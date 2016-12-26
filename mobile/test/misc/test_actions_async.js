
// test whether the correct action creator was called and
// whether the right action was returned.
const { expect} = require('chai')
const sinon = require('sinon');
import rootReducer from './../../app/reducers/reducers';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import state from './../json/state.json'
const FbTestUser = require('./../lib/FbTestUser');
// import { store } from '../../app/stores/store';
import * as actions from './../../app/actions/'
import * as Util from './../../app/utils/utils';
const mockStore = configureMockStore([thunk]);
const last = (arr) => arr[arr.length - 1];
module.exports = () => {
  describe('TEST_ASYNC_ACTIONS-->', () => {
    const store = mockStore(state);
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
      const existingFriendId = state.user.data[0].friendId;
      const existingEventsArr = state.user.data[0].events
      const existingEventsArrId = state.user.data[0].events[0].eventId;
      const eventNameToCreate = "eventNameToCreate";
      const eventDateToCreate = "eventDateToCreate";
      const eventIdToCreate = "eventIdToCreate";
      describe('should add a new event to the state (if adding new event to existing friend, isUpdating = true) ', () => {
        it('actions should work', () => {
            const store = mockStore(state);
            store.dispatch(actions.friendFormEventCreate(existingFriendId, eventNameToCreate, eventDateToCreate))
            expect(store.getActions()[0].type).to.equal('ADD_NEW_EVENT_TO_FRIEND'); // since it's an existing friend
        });
          it('ADD_NEW_EVENT_TO_FRIEND', () => {
             const newState = rootReducer(state, 
          {
            type: 'ADD_NEW_EVENT_TO_FRIEND',
            payload: {
              friendId: existingFriendId,
              eventName: eventNameToCreate,
              eventDate: eventDateToCreate,
            }
          })
        const { events } = newState.user.data[0];
        expect(last(events).eventName).to.equal(eventNameToCreate);
        expect(last(events).eventDate).to.equal(eventDateToCreate);
        }); 
      })
      it('FRIEND_FORM_EVENT_NAME_INPUT_UPDATE_OR_CREATE', () => {
        const newState = rootReducer(state,
          {
            type: 'FRIEND_FORM_EVENT_NAME_INPUT_UPDATE_OR_CREATE',
            payload: {
              eventId: eventIdToCreate,
              eventName: eventNameToCreate,
            }
          })
        const { friendFormEventInput } = newState.visible;
        expect(last(friendFormEventInput).eventName).to.equal(eventNameToCreate);
      })
      it('FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE', () => {
        const newState = rootReducer(state,
          {
            type: 'FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE',
            payload: {
              eventId: eventIdToCreate,
              eventDate: eventDateToCreate,
            }
          })
        const { friendFormEventInput } = newState.visible;
        expect(last(friendFormEventInput).eventDate).to.equal(eventDateToCreate);

      })

      it('the new event should have the right name (if adding new event to existing friend, isUpdating = true)', () => {

      })
      it('the new event should have an eventDate (if adding new event to existing friend, isUpdating = true)', () => {

      })
    })

  })
} // end of module.exports
