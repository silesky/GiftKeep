import * as initialStateUser from './../json/initialState.json'
import * as defaultFriend from './../json/defaultFriend.json'
import * as emptyState from './../json/emptyState.json'
import {
  combineReducers
} from 'redux'
import {
  createUuid
} from './../utils/utils';
// hello

const user = (state = initialStateUser, action) => {
  let newState, 
    newData, 
    oldgiftArr, 
    newGiftArr, 
    friendId, 
    giftDesc, 
    giftId,
    giftTitle
    ;
  const _getGiftArrByFriendId = (friendId) => state.data.find(el => el.friendId === friendId).gifts;
  const _getSingleGiftObj = (friendId, giftId) => _getGiftArrByFriendId(friendId).find((el) => el.giftId === giftId)
  switch (action.type) {
    
    case 'HYDRATE_USER':
    // fromat should be { data: [], fbId: ..., userName: }
    console.log('state', state, 'payload', action.payload);
      newState = action.payload
      return newState;
    case 'CLEAR':
      return emptyState;
    case 'UPDATE_GIFT_TITLE':
        friendId = action.payload.friendId;
        giftTitle = action.payload.giftTitle;
        giftId = action.payload.giftId;
        newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
           if (el.giftId === giftId) el.giftTitle = giftTitle
           return el
      })
      newData = state.data.map(el => {
          if (el.friendId === friendId) el.gifts = newGiftArr
          return el
      })
      newState = Object.assign({}, state, {data: newData})
      return newState;
        
    case 'DELETE_GIFT':
       friendId = action.payload.friendId;
       giftId = action.payload.giftId;

       newGiftArr = _getGiftArrByFriendId(friendId)
       .filter(el => el.giftId !== giftId)

      console.log('newGiftArr with thing removed', newGiftArr);
      newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      newState = Object.assign({}, state, {data: newData})
    
      return newState;

    case 'DELETE_FRIEND':
      friendId = action.payload.friendId;
      newData = state.data.filter(el => el.friendId !== friendId)
      newState = Object.assign({}, state, {data: newData})

      return newState;
      
    case 'UPDATE_GIFT_DESC':
      friendId = action.payload.friendId;
      giftDesc = action.payload.giftDesc;
      giftId = action.payload.giftId;
      newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
           if (el.giftId === giftId) el.giftDesc = giftDesc
           return el
      })
      newData = state.data.map(el => {
          if (el.friendId === friendId) el.gifts = newGiftArr
          return el
      })
      newState = { ...state, data: newData }
      return newState;

    case 'CREATE_FRIEND':
      return { ...state,  data: [...state.data, {
          friendId: createUuid(),
          friendName: action.payload.friendName,
          bday: action.payload.bday,
          gifts: []
        }]
        }
      
    case 'ADD_GIFT':
      newData = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.gifts = [...el.gifts, {
            giftTitle: '',
            giftId: createUuid()
          }]
        }
        return el
      })
      return { ...state, data: newData };

    default:
      return state;
  }
}

const initialStateFirstUser = {
  selectedFriendId: initialStateUser.data[0].friendId,
  createFriendModalVisibility: false,
  allGiftsVisibility: false,
};
const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'ALL_GIFTS_VISIBILITY_TOGGLE':
      return {...state, allGiftsVisibility: !state.allGiftsVisibility}
    case 'HYDRATE_VISIBLE':
      const newState = Object.assign({}, action.payload)
      return newState
    case 'SELECT_FRIEND':
      return { ...state, selectedFriendId: action.payload.friendId }
    case 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE':
      return { ...state,
        createFriendModalVisibility: !state.createFriendModalVisibility
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
  visible
})