const chai = require('chai')
const chaiHttp = require('chai-http');
const MongoClient = require('mongodb').MongoClient
chai.use(chaiHttp);

const { expect, request } = chai
  // check if user exists
  // if access token exists, return data -
    // otherwise return error
  // if user doesn't exist, check if user is valid on facebook
  // if facebook says success, then create a new user with the token

import { store }  from './../app/stores/store';
//const actions = require('./../app/actions/actions');
module.exports = () => {
    describe('CLIENT: Actions', () => { 
            it ('mocha should work', () => expect(true).to.be.true)
            console.log(store.getState())
    }   );
    it('when I login successfully, my redux store should populate', () => {
               expect(true).to.be.true;
    })
}
