import UUID from 'uuid-js';
import * as Utils from './../utils/utils';

const initialState = { "data": [] }
export const user = (state = initialState, action) => {
  const _getGiftArrByFriendId = (friendId) => state.data.find(el => el.friendId === friendId).gifts;
  const _getSingleGiftObj = (friendId, giftId) => _getGiftArrByFriendId(friendId).find((el) => el.giftId === giftId)
  switch (action.type) {
    case 'FRIEND_EVENT_DELETE': {
      const { eventId } = action.payload;
      const newEventArr = Utils.getEventArrAndDeleteEvent(state, eventId);
      const data = state.data.map((eachFriend) => {
        eachFriend.events.forEach((eachEvent) => {
          if (eachEvent.eventId === eventId) {
            eachFriend.events = newEventArr
          }
        })
        return eachFriend
      })
      return {...state, data }
    }
   case 'RESET_USER': {
      return initialState
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
          // bug where the eventToCreate array was getting populated with existing events
           const payloadEventDoesNotExistYet = !eachFriend.events.find(eventObj => eventObj.eventId === eachPayloadEvent.eventId);
          // find eventId in the payload matches the one in the events array
          // seach the whole array yo see if it's found
          if (eachEvent.eventId === eachPayloadEvent.eventId) {
            eachEvent.eventDate = eachPayloadEvent.eventDate;
            eachEvent.eventName = eachPayloadEvent.eventName;
          } else if (payloadEventDoesNotExistYet) {
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