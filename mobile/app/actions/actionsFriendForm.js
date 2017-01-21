import * as Utils from './../utils/utils'
import UUID from 'uuid-js';
import Moment from 'moment';
import { 
  _selectLastFriend, 
  _createNotification 
} from './index'
export const friendEventUpdateFromEventsView = (eventId, eventInputType) => {
console.log('called!');
return (dispatch, getState) => {
    const friendId = Utils.getFriendByEventId(getState(), eventId).friendId; 
    dispatch(friendFormUpdateActivate(friendId));
  }
}
export const friendEventDelete = (eventId) => {
  return (dispatch, getState) => {
    const {friendFormIsUpdating, friendFormIsVisible}  = getState().friendForm;
    if (friendFormIsVisible && !friendFormIsUpdating) {
      // if we're adding/updating events at the beginning, via 'create friend'
     dispatch({type: 'FRIEND_FORM_EVENT_INPUT_DELETE', payload: {eventId}})
  // if we're adding/updating via the edit friend swipe in the form or in the events view)  
    } else {
      dispatch({type: 'FRIEND_EVENT_DELETE', payload: {eventId}})
    }
  }
}
export const friendFormEventDatePickerSelectEvent = (eventId) => {
  return {
    type: 'FRIEND_FORM_EVENT_DATEPICKER_SELECT_EVENT',
    payload: { eventId }
  }
}
export const friendFormEventDatePickerVisibilityStatusChange = (bool) => {
   return (bool) 
   ? {type: 'FRIEND_FORM_EVENT_DATEPICKER_VISIBILITY_TRUE'} 
   : {type: 'FRIEND_FORM_EVENT_DATEPICKER_VISIBILITY_FALSE'}
}
export const friendFormVisibilityToggle = () => ({ type: 'FRIEND_FORM_VISIBILITY_TOGGLE' })


export const friendFormFriendNameInputUpdate = inputNameValue => ({
  type: 'FRIEND_FORM_NAME_INPUT', payload: inputNameValue
})

// hit the settings 
const _friendFormEventInputClear = () => ({ type: 'FRIEND_FORM_EVENT_INPUT_CLEAR_ALL' })

export const friendFormBdayInputUpdate = inputBdayValue => ({
  type: 'FRIEND_FORM_BDAY_INPUT', payload: inputBdayValue
})

export const friendFormUpdatingSelectedFriendId = (friendId) => ({
  type: 'FRIEND_FORM_UPDATING_SELECTED_FRIEND_ID',
  payload: { friendId }
})


const _friendFormUpdatingStatusChange = (bool) => {
  return (bool)
    ? { type: 'FRIEND_FORM_UPDATING_STATUS_TRUE' }
    : { type: 'FRIEND_FORM_UPDATING_STATUS_FALSE' }
}


const _hydrateFriendFormInputsFromPermStorage = friendId => {
  return (dispatch, getState) => {
    const {events, friendName, bday} = Utils.getFriendByFriendId(getState(), friendId);
    dispatch({
      type: 'FRIEND_FORM_INPUT_HYDRATE',
      payload: {
        friendFormNameInput: friendName,
        friendFormEventInput: events,
        friendFormBdayInput: bday,
      }
    })
  }
}

const _friendFormEventUpdateOrCreate = (friendId, friendFormEventInput) => {
  return {
    type: 'UPDATE_OR_CREATE_FRIEND_EVENTS',
    payload: { friendId, friendFormEventInput } //{"eventId": .."eventDate:": "eventName": }
  }
}
const _friendFormFriendNameUpdate = (friendId, friendName) => ({ type: 'UPDATE_FRIEND_NAME', payload: { friendId, friendName } });

const _friendFormFriendCreateFromTempStoredFormInputs = () => { 
return (dispatch, getState) => {
    const { friendFormEventInput, friendFormNameInput } = getState().friendForm
    dispatch({
      type: 'CREATE_FRIEND', 
      payload: { 
        friendId: UUID.create().toString(),
        friendName: friendFormNameInput,
        friendFormEventInput: friendFormEventInput
      }
    })
  }
}

// name input onchange event
export const friendFormEventDateInputUpdate = (eventId, eventDate) => { // if eventId is null, it will create the uuid in the reducer
  return {
    type: 'FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE',
    payload: { eventId, eventDate }
  }
}

// date input onchange event
export const friendFormEventNameInputUpdate = (eventId, eventName) => { //if eventId is null, it will create the uuid in the reducer
  return {
    type: 'FRIEND_FORM_EVENT_NAME_INPUT_UPDATE_OR_CREATE',
    payload: { eventId, eventName }
  }
}
// for when you swipe on a name in the drawer, and select update
export const friendFormUpdateActivate = (friendId) => { 
  return (dispatch) => {
    dispatch(_hydrateFriendFormInputsFromPermStorage(friendId)); // fixes the accidental overwriting of usernames on swipeToUpdate 
    dispatch(_friendFormUpdatingStatusChange(true))
    dispatch(friendFormUpdatingSelectedFriendId(friendId));
    dispatch(friendFormVisibilityToggle());
  }
}
// for when you hit 'ADD EVENT'
export const friendFormEventCreate = (friendId, eventName = '', eventDate = Moment().toISOString()) => { // for when you press the 'add event' button
  const _friendHasNotBeenCreatedYet = !friendId;
  return dispatch => {
      if (_friendHasNotBeenCreatedYet) {
        const newId = UUID.create().toString();
        // uuid gets created here bc eventNameInput needs to be in-sync// it's ok to change the id once it's made permentant
        dispatch(friendFormEventNameInputUpdate(newId, eventName));
        dispatch(friendFormEventDateInputUpdate(newId, eventDate));
    } else {
      dispatch({
        type: 'ADD_NEW_EVENT_TO_FRIEND',
        payload: { friendId, eventName, eventDate }
      })
  }
}
}





// for when you hit 'CANCEL'
export const friendFormCancel = () => {
  return dispatch => {
    dispatch(_friendFormUpdatingStatusChange(false))
    dispatch(friendFormUpdatingSelectedFriendId(null)); //clear friendId just in case 
    dispatch(_friendFormEventInputClear())
    dispatch(friendFormVisibilityToggle());
  }
}

// for when you hit 'CREATE'
export const friendFormCreateAndSave = () => {
  return dispatch => {
    dispatch(_friendFormFriendCreateFromTempStoredFormInputs());
    dispatch(_friendFormEventInputClear())
    dispatch(_selectLastFriend());
    dispatch(friendFormVisibilityToggle());
    dispatch(_createNotification('friend created.'))
  }
}

// for when you hit 'UPDATE'
export const friendFormUpdateAndSave = (friendId) => { // for when you hit create/update
  return (dispatch, getState) => {
    const { 
      friendFormNameInput,
      friendFormEventInput 
     } = getState().friendForm;
    dispatch(_friendFormEventUpdateOrCreate(friendId, friendFormEventInput));
    dispatch(_friendFormFriendNameUpdate(friendId, friendFormNameInput));
    dispatch(_friendFormUpdatingStatusChange(false))
    dispatch(_friendFormEventInputClear())
    dispatch(friendFormVisibilityToggle())
  }
}