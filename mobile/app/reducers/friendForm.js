import UUID from 'uuid-js'
import Moment from 'moment'

/*
  }
    "friendForm": {
      "friendFormUpdatingSelectedFriendId":
      "friendFormIsUpdating":
      "friendFormIsVisible":
      "friendFormBdayInput":
      "friendFormNameInput":
      "friendFormEventInput: [ {"eventId":..., "eventDate:...", "eventName:..."} ]
      "friendFormEventDatePickerIsVisible":

    }
  }
*/

/************************************************************************************/
const initialStateFirstUser = {
  friendFormUpdatingSelectedFriendId: null,
  friendFormIsUpdating: null,
  friendFormIsVisible: false,
  friendFormNameInput: null,
  friendFormEventInput: [],
  friendFormEventDatePickerIsVisible: false,
  friendFormEventDatePickerSelectedEventId: null,
  friendFormBdayInput: '01-10',
}

export const friendForm = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'HYDRATE_FRIEND_FORM': {
      return {
        ...action.payload,
        friendFormIsVisible: false, // no matter what, don't display this stuff
        friendFormEventDatePickerIsVisible: false,
        friendFormEventDatePickerSelectedEventId: null,
      }
    }
    case 'FRIEND_FORM_EVENT_DATEPICKER_SELECT_EVENT': {
      // which box is selected with onfocus
      return {
        ...state,
        friendFormEventDatePickerSelectedEventId: action.payload.eventId,
      }
    }
    case 'FRIEND_FORM_EVENT_DATEPICKER_VISIBILITY_FALSE': {
      return { ...state, friendFormEventDatePickerIsVisible: false }
    }
    case 'FRIEND_FORM_EVENT_DATEPICKER_VISIBILITY_TRUE': {
      return { ...state, friendFormEventDatePickerIsVisible: true }
    }
    case 'FRIEND_FORM_INPUT_HYDRATE': {
      const {
        friendFormNameInput,
        friendFormEventInput,
        friendFormBdayInput,
      } = action.payload
      return {
        ...state,
        friendFormNameInput,
        friendFormEventInput,
        friendFormBdayInput,
      }
    }

    case 'FRIEND_FORM_UPDATING_SELECTED_FRIEND_ID':
      return {
        ...state,
        friendFormUpdatingSelectedFriendId: action.payload.friendId,
      }

    case 'FRIEND_FORM_UPDATING_STATUS_TRUE':
      return { ...state, friendFormIsUpdating: true }

    case 'FRIEND_FORM_UPDATING_STATUS_FALSE':
      return { ...state, friendFormIsUpdating: false }

    case 'FRIEND_FORM_EVENT_INPUT_CLEAR_ALL': {
      return { ...state, friendFormNameInput: null, friendFormEventInput: [] }
    }

    case 'FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE': {
      const { eventId, eventDate } = action.payload
      const _eventDoesNotExistYet = eventId =>
        !state.friendFormEventInput.find(el => el.eventId === eventId)
      let newFriendFormEventInput
      if (_eventDoesNotExistYet(eventId)) {
        newFriendFormEventInput = [
          ...state.friendFormEventInput,
          {
            eventId: eventId || UUID.create().toString(),
            eventDate: eventDate,
            eventName: '',
          },
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
      const { eventId, eventName } = action.payload

      const _eventDoesNotExistYet = eventId =>
        !state.friendFormEventInput.find(el => el.eventId === eventId)
      let newFriendFormEventInput
      if (_eventDoesNotExistYet(eventId)) {
        const _tomorrow = Moment().add(1, 'day').toISOString()
        newFriendFormEventInput = [
          ...state.friendFormEventInput,
          {
            eventId: eventId || UUID.create().toString(),
            eventDate: _tomorrow,
            eventName: eventName,
          },
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
    case 'FRIEND_FORM_EVENT_INPUT_DELETE': {
      const { eventId } = action.payload
      const newFriendFormEventInput = state.friendFormEventInput.filter(
        eachEvent => {
          if (eachEvent.eventId !== eventId) return eachEvent
        }
      )
      return { ...state, friendFormEventInput: newFriendFormEventInput }
    }
    case 'FRIEND_FORM_NAME_INPUT':
      return { ...state, friendFormNameInput: action.payload }

    case 'FRIEND_FORM_BDAY_INPUT':
      return { ...state, friendFormBdayInput: action.payload }

    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      return {
        ...state,
        friendFormIsVisible: !state.friendFormIsVisible,
      }

    default:
      return state
  }
}
