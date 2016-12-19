// A reducer should return the new state after applying the action to the previous state.
import { expect } from 'chai';

import * as state from './../json/state.json'
import rootReducer from './../../app/reducers/reducers';
module.exports = () => {
  describe('REDUCERS:', () => {
    const existingFriendId = state.user.data[0].friendId;
    const existingEventId = state.user.data[0].events[0].eventId;
    describe('UPDATE_FRIEND', () => {
      let events, friendName;
      before(() => {
        let action = {
          type: 'UPDATE_FRIEND',
          payload: {
            friendId: existingFriendId,
            friendName: 'John A. New Friend',
            friendFormEventInputs: [
              {
                eventId: existingEventId,
                eventDate: '11-11',
                eventName: 'MyUpdatedEventName',
              },
              {
                eventId: 'create',
                eventDate: '12-12',
                eventName: 'MyJustCreatedEventName',
              }
            ]
          }
        }

        // use the action to get a new stat
        const newState = rootReducer(state, action).user.data[0]
          events = newState.events,
          friendName = newState.friendName
          ;
      })

      it('targeted friend should have an events array, and the updated event in that array should have properties--eventId, eventName, eventDate', () => {
        const anEventObj = events[0];
        expect(events).to.be.an.array;
        expect(anEventObj).to.have.property('eventId');
        expect(anEventObj).to.have.property('eventDate');
        expect(anEventObj).to.have.property('eventName');
      })

      it('should update friendName', () => {
        expect(friendName).to.equal('John A. New Friend');
      })

      it('should update events (object)', () => {
        const anEventObj = events[0]
        expect(anEventObj['eventId']).to.equal(existingEventId);
        expect(anEventObj['eventName']).to.equal('MyUpdatedEventName');
      })

      it('should create a new events if the id says create', () => {
        const anEventObj = events[events.length - 1];
        expect(anEventObj).to.have.property('eventId');
        expect(anEventObj).to.have.property('eventDate');
        expect(anEventObj).to.have.property('eventName');
        expect(anEventObj['eventId']).to.be.a.string;
        expect(anEventObj['eventName']).to.equal('MyJustCreatedEventName');
      })
    })
  }); // REDUCERS
} //module.exports