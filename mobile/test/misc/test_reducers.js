import { expect } from 'chai';
import * as state from './../json/state.json'

import rootReducer from './../../app/reducers/reducers';
describe('REDUCERS:', () => {
  it('UPDATE_FRIEND should update friend', () => {
    const existingFriendId = state.user.data[0].friendId, 
      updatedBday = "1-11",
      updatedFriendName = "MyNewFriendName";
    
    let action = { 
      type: 'UPDATE_FRIEND',
      payload: {
        friendId: existingFriendId,
        friendName: updatedFriendName,
        bday: updatedBday
      }
    }
    const currentStateFriendName = rootReducer(state, action).user.data[0].friendName
    const currentStateBday = rootReducer(state, action).user.data[0].bday
    expect(currentStateFriendName).to.equal(updatedFriendName);
    expect(currentStateBday).to.equal(updatedBday);
      
  });

});
