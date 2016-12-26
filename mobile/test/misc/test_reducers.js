// A reducer should return the new state after applying the action to the previous state.
import { expect } from 'chai';
import * as actions from './../../app/actions/'
import * as state from './../json/state.json'
import rootReducer, { user, visible } from './../../app/reducers/reducers';
module.exports = () => {
  describe('REDUCERS:', () => {
    before(() => rootReducer(state, actions.resetAll()))

    const existingFriendId = state.user.data[0].friendId;
    const existingEventId = state.user.data[0].events[0].eventId;
    describe('UPDATE_FRIEND_NAME', () => {
      const action = {
        type: 'UPDATE_FRIEND_NAME',
        payload: {
          friendId: existingFriendId,
          friendName: 'John A. New Friend',
        }
      }
      const friendName = rootReducer(state, action).user.data[0].friendName;
      it('should update friendName', () => {
        expect(friendName).to.equal('John A. New Friend');
      })

      describe('UPDATE_OR_CREATE_FRIEND_EVENTS', () => {
        const action = {
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
        const events = rootReducer(state, action).user.data[0].events
        afterEach(() => {
          rootReducer(state, actions.resetAll());
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
          expect(anEventObj).to.have.property('eventId');
          expect(anEventObj).to.have.property('eventDate');
          expect(anEventObj).to.have.property('eventName');
          expect(anEventObj['eventId']).to.be.a.string;
          expect(anEventObj['eventName']).to.equal('MyJustCreatedEventName');
        })

        it('if there are multiple new events, they should be created, too', () => {
          const anEventObj = events[events.length - 1];
          expect(anEventObj).to.have.property('eventId');
          expect(anEventObj).to.have.property('eventDate');
          expect(anEventObj).to.have.property('eventName');
          expect(anEventObj['eventId']).to.be.a.string;
          expect(anEventObj['eventName']).to.equal('MyJustCreatedEventName2');

        })
      })
      describe('FRIEND_EVENT_DELETE...', () => {
        // for deleting out of the visible reducer (temporary)
        const actionUser = {
          type: 'FRIEND_FORM_EVENT_DELETE',
          payload: { eventId: existingEventId }
        }
        // for deleting out of the user reducer (Permenant)
        const actionVisible = {
          type: 'FRIEND_FORM_EVENT_INPUT_DELETE',
          payload: { eventId: existingEventId }
        }

        const prevState = {
          "user": {
            "data": [{
              "friendName": "Nick",
              "events": [
                {
                  "eventId": "123-DELETEME",
                  "eventName": "tai kown do",
                  "eventDate": "12-16"
                },
                {
                  "eventId": "123-Filler",
                  "eventName": "JustAFillerEvent",
                  "eventDate": "01-01"
                }
              ]
            }]
          },
          "visible": {
            "friendFormEventInput": [
              {
                "eventId": "123-DELETEME",
                "eventName": "tai kown do",
                "eventDate:": "12-16",
              },
              {
                "eventId": "123-Filler",
                "eventName": "JustAnEditedFillerEvent",
                "eventDate": "01-01"
              }
            ]
          }

        }
        const newStateReducerUserEvents = rootReducer(prevState, actionUser).user.data[0].events
        const newStateReducerVisibleEvents = rootReducer(prevState, actionVisible).visible.friendFormEventInput;
        it.only('FRIEND_FORM_EVENT_DELETE should delete events from the VISIBLE reducer', () => {
          const anEventObj = newStateReducerVisibleEvents[0]
          console.log('#######', anEventObj)
          expect(newStateReducerVisibleEvents.length).to.equal(1);
          expect(anEventObj.eventName).to.equal('JustAnEditedFillerEvent')
        })
        it('FRIEND_EVENT_DELETE should delete events from the USER reducer', () => {
          const anEventObj = newStateReducerVisibleEvents[0]
          expect(newStateReducerUserEvents.length).to.equal(1);
          expect(anEventObj.eventName).to.equal('JustAnEditedFillerEvent')
        })
      })
    })
  }) // REDUCERS
} //module.exports