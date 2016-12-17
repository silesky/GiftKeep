const { expect } = require('chai');

import { store } from './../../app/stores/stores';
module.exports = () => {
  describe('STORE', () => {
    it('store.getState() should be an object', () => {
      expect(store.getState()).to.be.an.object;
    })
  });
  

}