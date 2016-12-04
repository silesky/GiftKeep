const {
  getFromAsyncStorage,
  saveToAsyncStorage
} = require('../../app/utils/utils');
import { AsyncStorage } from 'react-native'
const { expect } = require('chai');
const sinon = require('sinon');

const testAsync = () => {
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
    })
    const callback = sinon.spy()
    it('getFromAsyncStorage()', () => {
      try {
        getFromAsyncStorage('name', callback)
          .then(() => expect(callback.called).to.be.true);
      }
      catch (err) {
        expect(err).to.be.falsy;
      }

     it ('persist()', () => {
       // 
       console.log('hi');
     })
    })
  })

}

module.exports = testAsync;