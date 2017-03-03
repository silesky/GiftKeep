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
  "visible": {
      "selectedIdFromEventsView"
      "selectedFriendId":
      "selectedTab": // 'gifts' OR 'events' OR 'all gifts'

  }
*/

/************************************************************************************/
import {
  combineReducers
} from 'redux'

import { user } from './user'
import { visible } from './visible'
import { notification } from './notification'
import { friendForm } from './friendForm'
import { eventsView } from './eventsView'
export {
  user,
  visible,
  friendForm,
  notification // for testing
}

const rootReducer = combineReducers({
  user,
  visible,
  friendForm,
  notification,
  eventsView
})

export default rootReducer
