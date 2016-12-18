import UUID from 'uuid-js';
import {
  combineReducers
} from 'redux'
import {
  createUuid
} from './../utils/utils';
// hello

const initialStateUser = { "data": [] }
export const user = (state = initialStateUser, action) => {
  let
    bday,
    newState,
    newData,
    data,
    eventId,
    eventName,
    friendId,
    oldgiftArr,
    newGiftArr,
    friendName,
    giftDesc,
    giftId,
    giftTitle;
  const _getGiftArrByFriendId = (friendId) => state.data.find(el => el.friendId === friendId).gifts;
  const _getSingleGiftObj = (friendId, giftId) => _getGiftArrByFriendId(friendId).find((el) => el.giftId === giftId)
  switch (action.type) {
    case 'ADD_EVENT':
    data = state.data.map(el => {
      if (el.friendId === action.payload.friendId) {
        el.events = [...el.events, {
          eventName: action.payload.eventName,
          eventDate: action.payload.eventDate,
          eventId: UUID.create().toString()
         }]
      }
      return el
    })
    return {...state, data}

  // TODO: implement
    case 'UPDATE_FRIEND_NAME':
      data = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.friendName = action.payload.friendName;
        }
      })
      return {...state, data };

      // TODO: implement
    case 'UPDATE_EVENT':
      const { friendId, friendFormEventInputs } = action.payload;
      const payloadEventIdArr = Object.keys(action.payload.friendFormEventInputs);
      data = state.data.map(el => {
        if (el.friendId === friendId) {
        el.events = el.events // replace map object .... probaly should create an update friend event action
            .map((events, ind) => {
              // keys are being used as ids. on second throught, probably not my favorite experiment.
              // since you can have multiple event objects getting updated at the same time, and iterate over them;
                payloadEventIdArr.forEach(payloadEventId => {                           
                  const { 
                    inputEventDate, 
                    inputEventName 
                  } = friendFormEventInputs[payloadEventId];
                  if (events.eventId === payloadEventId) {
                    // very annoying to replace super nested properties 'eventDate, eventName'
                    el.events[ind].eventDate = inputEventDate;
                    el.events[ind].eventName = inputEventName;
                  }
                })
                return events
               })
          }
          })
              return {...state, data };


    // TODO: break up
    case 'UPDATE_FRIEND':
      // payload--friendId, friendName, friendFormEventInputs
      data = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.friendName = action.payload.friendName;
          el.events = el.events // replace map object .... probaly should create an update friend event action
          .map((events, ind) => {
              // keys are being used as ids. on second throught, probably not my favorite experiment.
              // since you can have multiple event objects getting updated at the same time, and iterate over them;
              const payloadEventIdArr = Object.keys(action.payload.friendFormEventInputs);
              payloadEventIdArr.forEach(payloadEventId => {                           
                const { 
                  inputEventDate, 
                  inputEventName 
                } = action.payload.friendFormEventInputs[payloadEventId];
                if (events.eventId === payloadEventId) {
                    // very annoying to replace super nested properties 'eventDate, eventName'
                    el.events[ind].eventDate = inputEventDate;
                    el.events[ind].eventName = inputEventName;
                  }
                })
              return events
            })
        }
        return el;
      })
      return {...state, data }

    case 'HYDRATE_USER':
      // fromat should be { data: [], fbId: ..., userName: }
      newState = action.payload
      return newState;
    case 'CLEAR':
      return { "data": [] }
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
      newState = Object.assign({}, state, { data: newData })
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
      newState = Object.assign({}, state, { data: newData })

      return newState;

    case 'DELETE_FRIEND':
      friendId = action.payload.friendId;
      newData = state.data.filter(el => el.friendId !== friendId)
      newState = Object.assign({}, state, { data: newData })

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
      return { ...state, data: [...state.data, {
        friendId: UUID.create().toString(),
        friendName: action.payload.friendName,
        bday: action.payload.bday,
        gifts: [],
        events: [],
      }]
      }
    case 'SAVE_FB_PHOTO':
      return { ...state, fbImage: action.payload.fbImage }
    case 'ADD_GIFT':
      newData = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.gifts = [...el.gifts, {
            giftTitle: '',
            giftId: UUID.create()
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
  selectedFriendId: null,
  friendFormUpdatingSelectedFriendId: null,
  friendFormIsUpdating: null,
  friendFormIsVisible: false,
  friendFormNameInput: null,
  friendFormBdayInput: "01-10",
  selectedTab: 0,
};
export const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'FRIEND_FORM_UPDATING_SELECTED_FRIEND_ID':
      return {...state, friendFormUpdatingSelectedFriendId: action.payload.friendId }
    case 'FRIEND_FORM_UPDATING_STATUS_TRUE':
      return {...state, friendFormIsUpdating: true }
    case 'FRIEND_FORM_UPDATING_STATUS_FALSE':
      return {...state, friendFormIsUpdating: false }
      
    case 'FRIEND_FORM_NAME_INPUT':
      return {...state, friendFormNameInput: action.payload }
    case 'FRIEND_FORM_BDAY_INPUT':
      return {...state, friendFormBdayInput: action.payload }
    case 'SELECT_TAB':
      return {...state, selectedTab: action.payload.selectedTab }
    case 'HYDRATE_VISIBLE':
      const newState = Object.assign({}, action.payload)
      return newState
    case 'SELECT_FRIEND':
      return { ...state, selectedFriendId: action.payload.friendId }
    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      return { ...state,
        friendFormIsVisible: !state.friendFormIsVisible
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  visible
})

export default rootReducer;