import UUID from 'uuid-js'
import * as Utils from './../utils/utils'
/*
      "user": {
        "labels"
        "userName"
        "fbId"
        "fbAccessToken"
        "data": [
          {
          "friendId":
          "friendName":
          "bday": ,
          "gifts": [],
          "events": [{
            "eventName": "",
            "eventDate": ""
            "eventId":
          }
       */

const initialState = {
  data: [],
  eventNameList: [
    `Anniversary`,
    `Birthday`,
    `Christmas`,
    `Confirmation`,
    `Chanukah`,
    `Graduation`,
    `Valentine's Day`,
    `Father's Day`,
    `Mother's Day`,
  ],
}
export const user = (state = initialState, action) => {
  const _getGiftArrByFriendId = friendId =>
    state.data.find(el => el.friendId === friendId).gifts
  switch (action.type) {
    case 'EVENT_NAME_ADD': {
      const eventName = action.payload
      return { ...state, eventNameList: [ ...state.eventNameList, eventName ] }
    }
    case 'EVENT_NAME_DELETE': {
      const eventName = action.payload
      const eventNameList = state.eventNameList.filter(
        eachName => eachName !== eventName
      )
      return { ...state, eventNameList }
    }
    case 'FRIEND_EVENT_DELETE': {
      const { eventId } = action.payload
      const newEventArr = Utils.getEventArrAndDeleteEvent(state, eventId)
      const data = state.data.map(eachFriend => {
        eachFriend.events.forEach(eachEvent => {
          if (eachEvent.eventId === eventId) {
            eachFriend.events = newEventArr
          }
        })
        return eachFriend
      })
      return { ...state, data }
    }
    case 'RESET_USER': {
      return initialState
    }
    case 'CREATE_EVENT': {
      const { friendId, eventName, eventDate } = action.payload
      console.log('payload', action.payload)
      let data = state.data.map(el => {
        if (el.friendId === friendId) {
          el.events = [
            ...el.events,
            {
              eventName: eventName,
              eventDate: eventDate,
              eventId: UUID.create().toString(),
            },
          ]
        }
        return el
      })
      console.log('newdata', data)
      return { ...state, data }
    }
    // TODO: implement
    case 'UPDATE_FRIEND_NAME': {
      let data = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.friendName = action.payload.friendName
        }
        return el
      })
      return { ...state, data }
    }
    case 'UPDATE_EVENT': {
      const { eventId, eventName, eventDate } = action.payload
      const data = state.data.map(eachUser => {
        const events = eachUser.events.map(eachEvent => {
          if (eachEvent.eventId === eventId) {
            if (eventName) eachEvent.eventName = eventName
            if (eventDate) eachEvent.eventDate = eventDate
          }
          return eachEvent
        })
        return { ...eachUser, events }
      })
      return { ...state, data }
    }
    // TODO: break up
    case 'UPDATE_OR_CREATE_FRIEND_EVENTS': {
      let eventsToCreate = []
      const friendId = action.payload.friendId,
        eventPayload = action.payload.friendFormEventInput
      let newData = state.data.map((eachFriend, ind) => {
        if (eachFriend.friendId === friendId) {
          eachFriend.events = eachFriend.events.map(eachEvent => {
            // return eachEvent

            eventPayload.forEach(eachPayloadEvent => {
              // bug where the eventToCreate array was getting populated with existing events
              const payloadEventDoesNotExistYet = !eachFriend.events.find(
                eventObj => eventObj.eventId === eachPayloadEvent.eventId
              )
              // find eventId in the payload matches the one in the events array
              // seach the whole array yo see if it's found
              if (eachEvent.eventId === eachPayloadEvent.eventId) {
                eachEvent.eventDate = eachPayloadEvent.eventDate
                eachEvent.eventName = eachPayloadEvent.eventName
              } else if (payloadEventDoesNotExistYet) {
                eventsToCreate.push({
                  eventId: eachPayloadEvent.eventId,
                  eventName: eachPayloadEvent.eventName,
                  eventDate: eachPayloadEvent.eventDate,
                })
              }
            }) // end eachPayloadEvent iterator
            // should be called once for each Event
            return eachEvent
          })

          if (eventsToCreate.length) {
            eachFriend.events.push(...eventsToCreate)
            eventsToCreate = []
          }
        }
        return eachFriend // end eachFriend iterator
      })
      const newState = Object.assign({}, state, { data: newData })
      return newState
    }

    case 'HYDRATE_USER': {
      const newState = action.payload
      return { ...initialState, ...newState }
    }
    case 'CLEAR': {
      return { data: [] }
    }
    case 'UPDATE_GIFT_TITLE': {
      let friendId = action.payload.friendId
      let giftTitle = action.payload.giftTitle
      let giftId = action.payload.giftId
      let newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
        if (el.giftId === giftId) el.giftTitle = giftTitle
        return el
      })
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = Object.assign({}, state, { data: newData })
      return newState
    }
    case 'DELETE_GIFT': {
      let friendId = action.payload.friendId
      let giftId = action.payload.giftId
      let newGiftArr = _getGiftArrByFriendId(friendId).filter(
        el => el.giftId !== giftId
      )
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = Object.assign({}, state, { data: newData })

      return newState
    }

    case 'DELETE_FRIEND': {
      let friendId = action.payload.friendId
      let newData = state.data.filter(el => el.friendId !== friendId)
      let newState = Object.assign({}, state, { data: newData })

      return newState
    }

    case 'UPDATE_GIFT_DESC': {
      let friendId = action.payload.friendId
      let giftDesc = action.payload.giftDesc
      let giftId = action.payload.giftId
      let newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
        if (el.giftId === giftId) el.giftDesc = giftDesc
        return el
      })
      let newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      let newState = { ...state, data: newData }
      return newState
    }

    case 'CREATE_FRIEND': {
      const { friendId, friendName, friendFormEventInput } = action.payload
      return {
        ...state,
        data: [
          ...state.data,
          {
            friendId: friendId,
            friendName: friendName,
            bday: null,
            gifts: [],
            events: friendFormEventInput,
          },
        ],
      }
    }
    case 'SAVE_FB_PHOTO': {
      return { ...state, fbImage: action.payload.fbImage }
    }
    case 'CREATE_GIFT': {
      const { friendId, giftTitle, giftDesc } = action.payload
      let newData = state.data.map(el => {
        if (el.friendId === friendId) {
          el.gifts = [
            {
              giftTitle,
              giftDesc,
              giftId: UUID.create().toString(),
            },
            ...el.gifts,
          ]
        }
        return el
      })
      return { ...state, data: newData }
    }

    default: {
      return state
    }
  }
}
