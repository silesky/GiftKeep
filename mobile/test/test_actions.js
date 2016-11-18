const chai = require('chai')
  // check if user exists
  // if access token exists, return data -
    // otherwise return error
  // if user doesn't exist, check if user is valid on facebook
  // if facebook says success, then create a new user with the token
const { expect} = chai;
const store = require('./../app/stores/store')
//const actions = require('./../app/actions/actions');
module.exports = () => {
    describe('CLIENT: Actions', () => { 
        it ('mocha should work', () => {
            expect(true).to.be.true;
        });
    });
    it('when I login successfully, my redux store should populate', () => {
               expect(true).to.be.true;
    })
}
