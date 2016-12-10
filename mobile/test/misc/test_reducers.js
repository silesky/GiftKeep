import { expect } from 'chai';
import * as state from './../json/state.json'

import rootReducer from './../../app/reducers/reducers';
describe('REDUCERS:', () => {
  it('UPDATE_FRIEND_NAME should update friend', () => {
    const _nick = state.user.data[0];
    let action = { 
      type: 'UPDATE_FRIEND_NAME',
      payload: {
        friendId: _nick['friendId'],
        friendName: "MyNewFriendName",
      }
    }
    const newStateWithNewFriendName = rootReducer(state, action).user.data[0].friendName
    expect(newStateWithNewFriendName).to.equal("Bill")
  });
});