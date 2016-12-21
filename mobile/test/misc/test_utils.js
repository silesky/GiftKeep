import * as Utils from '../../app/utils/utils'
import { AsyncStorage } from 'react-native'
const { expect } = require('chai');
const sinon = require('sinon');
import state from './../json/state.json';
const testUtils = () => {
  const _clear = () => AsyncStorage.clear();
  describe('UTILS', () => {
    describe('saveToAsyncStorage', () => {
      after(() => _clear());

      it('saveToAsyncStorage()', () => {
        // callback should be called when an item is successfully saved
        const callback = sinon.spy()
        try {
          Utils.saveToAsyncStorage("name", "Seth Silesky", callback)
            .then(() => expect(callback.called).to.be.true)
        }
        catch (err) {
          expect(err).to.be.falsy;
        }
      }),
        it('getFromAsyncStorage()', () => {
          const callback = sinon.spy()
          try {
            Utils.getFromAsyncStorage('name', callback)
              .then(() => expect(callback.called).to.be.true);
          }
          catch (err) {
            expect(err).to.be.falsy;
          }
        })
    }),
      describe('misc functional tests', () => {
        const _steve = state.user.data[2];
        const dummyFriendObjToReturn = _steve;
        const dummyGiftId = _steve.gifts[0].giftId;
        const dummygiftObjToReturn = _steve.gifts[0];
        const dummyFriendId = _steve.friendId;
        const dummyEventId = _steve.events[0].eventId;
        const dummyEventObjToReturn = _steve.events[0];

        it('getGiftByGiftId', () => {
          expect(Utils.getGiftByGiftId(state, dummyGiftId)).to.equal(dummygiftObjToReturn)
        }),
          it('getFriendByFriendId', () => {

            expect(Utils.getFriendByFriendId(state, dummyFriendId)).to.equal(dummyFriendObjToReturn)
          }),
          it('getFriendNameById', () => {
            expect(Utils.getFriendByGiftId(state, dummyFriendId)).to.be.a.string;
            expect(Utils.getFriendNameById(state, dummyFriendId)).to.equal(dummyFriendObjToReturn['friendName'])
          }),
          it('getFriendByGiftId', () => {
            expect(Utils.getFriendByGiftId(state, dummyGiftId)).to.have.property('friendName');
            expect(Utils.getFriendByGiftId(state, dummyGiftId)).to.equal(dummyFriendObjToReturn)
          })
          it('getEventsByFriendId', () => {
          expect(Utils.getEventsByFriendId(state, dummyFriendId)).to.be.an.array;
          expect(Utils.getEventsByFriendId(state, dummyFriendId)[0]).to.have.property('eventId');
          expect(Utils.getEventsByFriendId(state, dummyFriendId)[0]).to.have.property('eventName');
          })
           it('getAnEventByEventId', () => {
          expect(Utils.getAnEventByEventId(state, dummyEventId)).to.be.an.object;
          expect(Utils.getAnEventByEventId(state, dummyEventId)).to.have.property('eventId');
          expect(Utils.getAnEventByEventId(state, dummyEventId)).to.have.property('eventName');
           expect(Utils.getAnEventByEventId(state, dummyEventId)).to.equal(dummyEventObjToReturn);
          })
      })
  });
}

module.exports = testUtils;