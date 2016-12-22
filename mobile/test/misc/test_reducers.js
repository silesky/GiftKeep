// A reducer should return the new state after applying the action to the previous state.
import { expect } from 'chai';

import * as state from './../json/state.json'
import rootReducer from './../../app/reducers/reducers';
module.exports = () => {
  describe('REDUCERS:', () => {
    const existingFriendId = state.user.data[0].friendId;
    const existingEventId = state.user.data[0].events[0].eventId;
    describe('UPDATE_FRIEND_NAME', () => {
      let friendName
      before(() => {
        let action = {
          type: 'UPDATE_FRIEND_NAME',
          payload: {
            friendId: existingFriendId,
            friendName: 'John A. New Friend',
          }
        }
        friendName = rootReducer(state, action).user.data[0].friendName;
      })
      it('should update friendName', () => {
        expect(friendName).to.equal('John A. New Friend');
      })
    })
    describe('UPDATE_OR_CREATE_FRIEND_EVENTS', () => {
      let events;
      before(() => {
        let action = {
          type: 'UPDATE_OR_CREATE_FRIEND_EVENTS',
          payload: {
            friendId: existingFriendId,
            friendFormEventInput: [
              {
                eventId: existingEventId,
                eventDate: '11-11',
                eventName: 'MyUpdatedEventName',
              },
              {
                eventId: 'IDONTEXIST',
                eventDate: '12-12',
                eventName: 'MyJustCreatedEventName',
              },
              {
                eventId: 'IDONTEXIST2',
                eventDate: '12-12',
                eventName: 'MyJustCreatedEventName2',
              }
            ],

          }
        }
        console.log('#########', rootReducer(state, action))

        // use the action to get a new stat
        events = rootReducer(state, action).user.data[0].events
      })

      it('targeted friend should have an events array, and the updated event in that array should have properties--eventId, eventName, eventDate', () => {
        const anEventObj = events[0];
        expect(events).to.be.an.array;
        expect(anEventObj).to.have.property('eventId');
        expect(anEventObj).to.have.property('eventDate');
        expect(anEventObj).to.have.property('eventName');
      })


      it('should update events (object)', () => {
        const anEventObj = events[0]
        expect(anEventObj['eventId']).to.equal(existingEventId);
        expect(anEventObj['eventName']).to.equal('MyUpdatedEventName');
      })

      it('should be able to create a new event, rather than update (if no existing id is found)', () => {
        const anEventObj = events[1];
        console.log(events[1]);
        expect(anEventObj).to.have.property('eventId');
        expect(anEventObj).to.have.property('eventDate');
        expect(anEventObj).to.have.property('eventName');
        expect(anEventObj['eventId']).to.be.a.string;
        expect(anEventObj['eventName']).to.equal('MyJustCreatedEventName');

      })
      it('if there are multiple new events, they should be created, too', () => {
        const anEventObj2 = events[events.length - 1];
        expect(anEventObj2).to.have.property('eventId');
        expect(anEventObj2).to.have.property('eventDate');
        expect(anEventObj2).to.have.property('eventName');
        expect(anEventObj2['eventId']).to.be.a.string;
        expect(anEventObj2['eventName']).to.equal('MyJustCreatedEventName2');

      })
    })
  }); // REDUCERS
} //module.exports