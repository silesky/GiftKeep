import UUID from 'uuid-js';
import {
  combineReducers
} from 'redux'

/*
  {
    "user": {
      "userName": 
      "fbId": 
      "fbAccessToken": 
      "data": [
        {
          "friendId": 
          "order": 
          "friendName": 
          "bday": 
          "events": [
            {
              "eventId": 
              "eventName": 
              "eventDate":
            }
          ],
          "gifts": [
            {
              "giftTitle": 
              "giftDesc": 
              "giftId": 
              "eventIds": [...]
            }
          ]
        },
      ]
    },
    "visible": {
      "selectedFriendId": 
      "friendFormUpdatingSelectedFriendId": 
      "friendFormIsUpdating": 
      "friendFormIsVisible":
      "friendFormBdayInput": 
      "friendFormNameInput":
      "friendFormEventInput: [ {"eventId":..., "eventDate:...", "eventName:..."} ]
      "selectedTab": 
    }
  }
*/

const initialStateUser = { "data": [] }
export const user = (state = initialStateUser, action) => {



  const _getGiftArrByFriendId = (friendId) => state.data.find(el => el.friendId === friendId).gifts;
  const _getSingleGiftObj = (friendId, giftId) => _getGiftArrByFriendId(friendId).find((el) => el.giftId === giftId)
  switch (action.type) {
   case 'RESET_USER': {
    return initialStateUser 
   }
    case 'ADD_NEW_EVENT_TO_FRIEND': {
      const { friendId, eventName, eventDate } = action.payload;
      let data = state.data.map(el => {
        if (el.friendId === friendId) {
          el.events = [...el.events, {
            eventName: eventName,
            eventDate: eventDate,
            eventId: UUID.create().toString()
          }]
        }
        return el
      })
      return { ...state, data }
    }
    // TODO: implement
    case 'UPDATE_FRIEND_NAME': {
      let data = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.friendName = action.payload.friendName;
        }
        return el;
      })
      return { ...state, data };
    }
    // TODO: break up
    case 'UPDATE_OR_CREATE_FRIEND_EVENTS': {
     let eventsToCreate = [];
      const friendId = action.payload.friendId, 
        eventPayload = action.payload.friendFormEventInput
        ;
      let newData = state.data.map((eachFriend, ind) => {
        if (eachFriend.friendId === friendId) {
          eachFriend.events = eachFriend.events.map((eachEvent) => {
            // return eachEvent
            eventPayload.forEach((eachPayloadEvent) => {
              // find eventId in the payload matches the one in the events array
              if (eachEvent.eventId === eachPayloadEvent.eventId) {
                eachEvent.friendId = friendId
                eachEvent.eventDate = eachPayloadEvent.eventDate;
                eachEvent.eventName = eachPayloadEvent.eventName;
              } else {
                eventsToCreate.push({
                  eventId: eachPayloadEvent.eventId,
                  eventDate: eachPayloadEvent.eventDate,
                  eventName: eachPayloadEvent.eventName,
                })
              }
            }) // end eachPayloadEvent iterator
            // should be called once for each Event
          return eachEvent
          })

         if (eventsToCreate.length) {
              eachFriend.events.push(...eventsToCreate)
              eventsToCreate = []; 
            }
        }
        return eachFriend;// end eachFriend iterator 
      })
      const newState = Object.assign({}, state, { data: newData })
      return newState;
    }

    case 'HYDRATE_USER': {
      // fromat should be { data: [], fbId: ..., userName: }
      let newState = action.payload
      return newState;
    }
    case 'CLEAR': {
      return { "data": [] }
    }
    case 'UPDATE_GIFT_TITLE': {
      let friendId = action.payload.friendId;
      let giftTitle = action.payload.giftTitle;
      let giftId = action.payload.giftId;
      let newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
        if (el.giftId === giftId) el.giftTitle = giftTitle
        return el
      })
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = Object.assign({}, state, { data: newData })
      return newState;
    }
    case 'DELETE_GIFT': {
      let friendId = action.payload.friendId;
      let giftId = action.payload.giftId;
      let newGiftArr = _getGiftArrByFriendId(friendId)
        .filter(el => el.giftId !== giftId)
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = Object.assign({}, state, { data: newData })

      return newState;
    }

    case 'DELETE_FRIEND': {
      let friendId = action.payload.friendId;
      let newData = state.data.filter(el => el.friendId !== friendId)
      let newState = Object.assign({}, state, { data: newData })

      return newState;
    }

    case 'UPDATE_GIFT_DESC': {
      let friendId = action.payload.friendId;
      let giftDesc = action.payload.giftDesc;
      let giftId = action.payload.giftId;
      let newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
        if (el.giftId === giftId) el.giftDesc = giftDesc
        return el
      })
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = { ...state, data: newData }
      return newState;
    }

    case 'CREATE_FRIEND': {
      const {
        friendId, 
        friendName,
        friendFormEventInput,
      } = action.payload; 
      return {
        ...state, data: [...state.data, {
          friendId: friendId, 
          friendName: friendName,
          bday: null,
          gifts: [],
          events: friendFormEventInput,
        }]
      }
    }
    case 'SAVE_FB_PHOTO': {
      return { ...state, fbImage: action.payload.fbImage }
    }
    case 'ADD_GIFT': {
      let newData = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.gifts = [...el.gifts, {
            giftTitle: '',
            giftId: UUID.create().toString()
          }]
        }
        return el
      })
      return { ...state, data: newData };
    }
    default: {
      return state;
    }
  }
}

const initialStateFirstUser = {

  selectedFriendId: null,
  friendFormUpdatingSelectedFriendId: null,
  friendFormIsUpdating: null,
  friendFormIsVisible: false,
  friendFormNameInput: null,
  friendFormEventInput: [],
  friendFormBdayInput: "01-10",
  selectedTab: 0,
};
export const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'FRIEND_FORM_INPUT_HYDRATE': {
      const { 
        friendFormNameInput, friendFormEventInput, friendFormBdayInput 
      } = action.payload;
      return {...state, friendFormNameInput, friendFormEventInput, friendFormBdayInput }
    }
    case 'RESET_VISIBLE': {
      return initialStateFirstUser 
    }

    case 'FRIEND_FORM_UPDATING_SELECTED_FRIEND_ID':
      return { ...state, friendFormUpdatingSelectedFriendId: action.payload.friendId }

    case 'FRIEND_FORM_UPDATING_STATUS_TRUE':
      return { ...state, friendFormIsUpdating: true }

    case 'FRIEND_FORM_UPDATING_STATUS_FALSE':
      return { ...state, friendFormIsUpdating: false }

    case 'FRIEND_FORM_EVENT_INPUT_CLEAR_ALL': {
      return { ...state, friendFormEventInput: [] }
    }

    case 'FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE': {
      const { eventId, eventDate } = action.payload;
      const _eventDoesNotExistYet = (eventId) => !state.friendFormEventInput.find(el => el.eventId === eventId);
      let newFriendFormEventInput;
      if (_eventDoesNotExistYet(eventId)) {
        newFriendFormEventInput = [...state.friendFormEventInput, {
          eventId: eventId,
          eventDate: eventDate,
        }
        ]
      } else {
        newFriendFormEventInput = state.friendFormEventInput.map(eachEvent => {
          if (eachEvent.eventId === eventId) {
            eachEvent.eventDate = eventDate
          }
          return eachEvent
        })
      }
      return { ...state, friendFormEventInput: newFriendFormEventInput }
    }

    case 'FRIEND_FORM_EVENT_NAME_INPUT_UPDATE_OR_CREATE': {
      const { eventId, eventName } = action.payload;
      const _eventDoesNotExistYet = (eventId) => !state.friendFormEventInput.find(el => el.eventId === eventId);
      let newFriendFormEventInput;
      if (_eventDoesNotExistYet(eventId)) {
        newFriendFormEventInput = [...state.friendFormEventInput, {
          eventId: eventId,
          eventName: eventName,
        }
        ]
      } else {
        newFriendFormEventInput = state.friendFormEventInput.map(eachEvent => {
          if (eachEvent.eventId === eventId) {
            eachEvent.eventName = eventName
          }
          return eachEvent
        })
      }

      return { ...state, friendFormEventInput: newFriendFormEventInput }
    }

    case 'FRIEND_FORM_NAME_INPUT':
      return { ...state, friendFormNameInput: action.payload }

    case 'FRIEND_FORM_BDAY_INPUT':
      return { ...state, friendFormBdayInput: action.payload }

    case 'SELECT_TAB':
      return { ...state, selectedTab: action.payload.selectedTab }

    case 'HYDRATE_VISIBLE':
      const newState = Object.assign({}, action.payload)
      return newState

    case 'SELECT_FRIEND':
      return { ...state, selectedFriendId: action.payload.friendId }

    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      return {
        ...state,
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