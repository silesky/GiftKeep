import {
  initialStateUser
} from './../initialState.js'
import {
  combineReducers
} from 'redux'
import {
  createUuid
} from './../utils/util';

const user = (state = initialStateUser, action) => {
  //console.log("oldState: ", state)
  switch (action.type) {
    case 'CREATE_FRIEND':
      return Object.assign({}, {
        data: [...state.data, {
          friendId: createUuid(),
          friendName: action.payload.friendName,
          bday: action.payload.bday,
          gifts: []
        }]
      })
    case 'ADD_GIFT':
      const newData = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.gifts = [...el.gifts, {
            giftName: 'new gift',
            giftId: createUuid()
          }]
        }
        return el
      })
      return Object.assign({}, {
        data: newData
      });
    


    default:
      return state;
  }

}

const initialStateFirstUser = {
  selectedFriendId: initialStateUser.data[0].friendId,
  createFriendModalVisibility: false
};
const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'SELECT_FRIEND':
      return Object.assign({}, state, {
        selectedFriendId: action.payload.friendId
      });
    case 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE':
      return Object.assign({}, state, {
        createFriendModalVisibility: !state.createFriendModalVisibility
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
  visible
})