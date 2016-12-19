// A reducer should return the new state after applying the action to the previous state.
import {
  expect
} from 'chai';
import * as state from './../json/state.json'
import rootReducer from './../../app/reducers/reducers';
module.exports = () => {
    describe.only('REDUCERS:', () => {
      this.existingFriendId = state.user.data[0].friendId;
      this.existingEventId = state.user.data[0].events[0].eventId;
      describe('UPDATE_FRIEND', () => {
        let events, friendName;
        before(() => {
          let action = {
            type: 'UPDATE_FRIEND',
            payload: {
              friendId: this.existingFriendId,
              friendName: 'John A. New Friend',
              friendFormEventInputs: [
                {
                  eventId: this.existingEventId,
                  inputEventDate: '11-11',
                  inputEventName: 'MyNewEventName',
                }
               ]
              }
            }
          // use the action to get a new state
          const newState = rootReducer(state, action).user.data[0]
            events = newState.events;
            friendName = newState.friendName;
        })
        it('should update friendName', () => {
          expect(friendName).to.equal('John A. New Friend');
        })
        it('should update events (object)', () => {
          const anEventObj = events[0];
          expect(events).to.be.an.array;
          expect(anEventObj).to.have.property('eventId');
          expect(anEventObj).to.have.property('eventDate');
          expect(anEventObj).to.have.property('eventName');
          expect(anEventObj['eventId']).to.equal(this.existingEventId);
          expect(anEventObj['eventName']).to.equal('MyNewEventName');
        })


      })
    }); // REDUCERS
  } //module.exports