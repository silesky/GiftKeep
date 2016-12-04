const {
  getFromAsyncStorage,
  saveToAsyncStorage,
  getGiftByGiftId,
  getFriendByFriendId,
  getFriendNameById
} = require('../../app/utils/utils');
import { AsyncStorage } from 'react-native'
const { expect } = require('chai');
const sinon = require('sinon');
import state from './../json/state.json';
const testUtils = () => {
  const _clear = () => AsyncStorage.clear();
  describe('saveToAsyncStorage', () => {
    after(() => _clear());

    it('saveToAsyncStorage()', () => {
      // callback should be called when an item is successfully saved
      const callback = sinon.spy()
      try {
        saveToAsyncStorage("name", "Seth Silesky", callback)
          .then(() => expect(callback.called).to.be.true)
      }
      catch (err) {
        expect(err).to.be.falsy;
      }
    }),

      it('getFromAsyncStorage()', () => {
        const callback = sinon.spy()
        try {
          getFromAsyncStorage('name', callback)
            .then(() => expect(callback.called).to.be.true);
        }
        catch (err) {
          expect(err).to.be.falsy;
        }
      }),
      it('getGiftByGiftId', () => {
        const dummyGiftId = state.user.data[1].gifts[0]['giftId'];
        const dummygiftObjToReturn = state.user.data[1].gifts[0];
        expect(getGiftByGiftId(state, dummyGiftId)).to.equal(dummygiftObjToReturn)
      }),
      it('getFriendByFriendId', () => {
        const dummyFriendId = state.user.data[2]['friendId'];
        const dummyFriendObjToReturn = state.user.data[2];
        expect(getFriendByFriendId(state, dummyFriendId)).to.equal(dummyFriendObjToReturn)
      }),
      it('getFriendNameById', () => {
        const dummyFriendId = state.user.data[2]['friendId'];
        const dummyFriendNameToReturn = state.user.data[2].friendName;
        expect(getFriendNameById(state, dummyFriendId)).to.equal(dummyFriendNameToReturn)
      })
  })
}

module.exports = testUtils;