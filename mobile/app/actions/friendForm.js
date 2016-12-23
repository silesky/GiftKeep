import * as Utils from './../utils/utils'
import { _selectLastFriend } from './index'
import UUID from 'uuid-js';

// for when you're adding a friend... unfortunately, there's no friendId
export const friendFormAddEvent = (friendId, eventName, eventDate) => { // TODO: hook it up!
  const _friendHasNotBeenCreatedYet = !friendId;
  return dispatch => {
      if (_friendHasNotBeenCreatedYet) {
        // create a new friend and store it in visible object (since it's temporary)
        const newId = UUID.create().toString();
        dispatch(friendFormEventNameInputUpdate(newId, eventName));
        dispatch(friendFormEventDateInputUpdate(newId, eventDate));

    } else {
      dispatch({ // if friend form is updating, friend id must exist, so new events can go in the user object
        type: 'ADD_EVENT',
        payload: { friendId, eventName, eventDate }
      })
  }
}
}

export const friendFormVisibilityToggle = () => ({ type: 'FRIEND_FORM_VISIBILITY_TOGGLE' })

export const friendFormEventDateInputUpdate = (eventId, eventDate) => {
  return {
    type: 'FRIEND_FORM_EVENT_DATE_INPUT_UPDATE_OR_CREATE',
    payload: { eventId, eventDate }
  }
}

export const friendFormEventNameInputUpdate = (eventId, eventName) => {
  return {
    type: 'FRIEND_FORM_EVENT_NAME_INPUT_UPDATE_OR_CREATE',
    payload: { eventId, eventName }
  }
}
export const friendFormNameInputUpdate = inputNameValue => ({
  type: 'FRIEND_FORM_NAME_INPUT', payload: inputNameValue
})

const friendFormEventInputClear = () => ({ type: 'FRIEND_FORM_EVENT_INPUT_CLEAR_ALL' })

export const friendFormBdayInputUpdate = inputBdayValue => ({
  type: 'FRIEND_FORM_BDAY_INPUT', payload: inputBdayValue
})

export const friendFormUpdatingSelectedFriendId = (friendId) => ({
  type: 'FRIEND_FORM_UPDATING_SELECTED_FRIEND_ID',
  payload: { friendId }
})

export const friendFormCancelUpdateOrCreate = () => {
  return dispatch => {
    dispatch(friendFormUpdatingStatusChange(false))
    dispatch(friendFormUpdatingSelectedFriendId(null)); //clear friendId just in case 
    dispatch(friendFormEventInputClear())
    dispatch(friendFormVisibilityToggle());
  }
}

const friendFormUpdatingStatusChange = (bool) => {
  return (bool)
    ? { type: 'FRIEND_FORM_UPDATING_STATUS_TRUE' }
    : { type: 'FRIEND_FORM_UPDATING_STATUS_FALSE' }
}

const _friendFormSetCurrentInputByFriendId = (friendId) => {
  return (dispatch, getState) => {
    const { bday, friendName } = Utils.getFriendByFriendId(getState(), friendId);
    dispatch(friendFormBdayInputUpdate(bday));
    dispatch(friendFormNameInputUpdate(friendName));
  }
}

export const friendFormIsUpdating = (friendId) => { //swipe to update
  return (dispatch) => {
    dispatch(_friendFormSetCurrentInputByFriendId(friendId)); // fixes the accidental overwriting of usernames on swipeToUpdate 
    dispatch(friendFormUpdatingStatusChange(true))
    dispatch(friendFormUpdatingSelectedFriendId(friendId));
    dispatch(friendFormVisibilityToggle());
  }
}

const updateOrCreateFriendEvents = (friendId, friendFormEventInput) => {
  return {
    type: 'UPDATE_OR_CREATE_FRIEND_EVENTS',
    payload: { friendId, friendFormEventInput } //{"eventId": .."eventDate:": "eventName": }
  }
}
const updateFriendName = (friendId, friendName) => ({ type: 'UPDATE_FRIEND_NAME', payload: { friendId, friendName } });

export const updateFriendNameAndOrUpdateOrCreateEvents = (friendId) => {
  return (dispatch, getState) => {
    const { 
      friendFormNameInput,
      friendFormEventInput 
     } = getState().visible;
    dispatch(updateOrCreateFriendEvents(friendId, friendFormEventInput));
    dispatch(updateFriendName(friendId, friendFormNameInput));
    dispatch(friendFormUpdatingStatusChange(false))
    dispatch(friendFormEventInputClear())
    dispatch(friendFormVisibilityToggle())
  }
}


export const _createFriend = (friendName, bday) => ({ type: 'CREATE_FRIEND', payload: { friendName, bday } });
// modal visibility toggle called
export const createFriend = (friendName, bday) => {
  bday = (bday) ? bday : '???';
  return (dispatch) => {
    dispatch(_createFriend(friendName, bday));
    dispatch(friendFormEventInputClear())
    dispatch(_selectLastFriend());
    dispatch(friendFormVisibilityToggle());
  }
}