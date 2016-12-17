import * as Utils from '../../app/utils/utils'
import { AsyncStorage } from 'react-native'
const { expect } = require('chai');
const sinon = require('sinon');
import state from './../json/state.json';
const testUtils = () => {
  const _clear = () => AsyncStorage.clear();
  describe('Util.js', () => {
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
        const dummyGiftId = _steve.gifts[0]['giftId'];
        const dummygiftObjToReturn = _steve.gifts[0];
        const dummyFriendId = _steve['friendId'];
        const dummyFriendObjToReturn = _steve;
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
        it('getFriendFormInput', () => {
          const state = {
            "visible": {
              "selectedFriendId": "70fab100-3398-444a-8aba-5d9db249134e",
              "friendFormUpdatingSelectedFriendId": "10a678a1-e543-4bf3-a832-413bdfed23cb",
              "friendFormIsUpdating": true,
              "friendFormIsVisible": true,
              "friendFormNameInput": "Nick",
              "friendFormBdayInput": "12-16",
              "selectedTab": 0
            }
          }
        
        expect(Utils.getFriendFormInput(state)).to.have.property('friendFormBdayInput');
           
  })
})
  });
}

module.exports = testUtils;