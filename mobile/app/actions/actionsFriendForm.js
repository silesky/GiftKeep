import * as Utils from './../utils/utils'
import { _selectLastFriend } from './index'
import UUID from 'uuid-js';

// for when you're adding a friend... unfortunately, there's no friendId
export const friendFormAddEvent = (friendId, eventName, eventDate) => { // TODO: hook it up!
  const _friendHasNotBeenCreatedYet = !friendId;
  return dispatch => {
      if (_friendHasNotBeenCreatedYet) {
        const newId = UUID.create().toString();
        dispatch(friendFormEventNameInputUpdate(newId, eventName));
        dispatch(friendFormEventDateInputUpdate(newId, eventDate));
    } else {
      dispatch({
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
export const friendFormIsUpdating = (friendId) => { //swipe to update
  return (dispatch) => {
    dispatch(_hydrateFriendFormInputsFromPermStorage(friendId)); // fixes the accidental overwriting of usernames on swipeToUpdate 
    dispatch(friendFormUpdatingStatusChange(true))
    dispatch(friendFormUpdatingSelectedFriendId(friendId));
    dispatch(friendFormVisibilityToggle());
  }
}

const _updateOrCreateFriendEvents = (friendId, friendFormEventInput) => {
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
    dispatch(_updateOrCreateFriendEvents(friendId, friendFormEventInput));
    dispatch(updateFriendName(friendId, friendFormNameInput));
    dispatch(friendFormUpdatingStatusChange(false))
    dispatch(friendFormEventInputClear())
    dispatch(friendFormVisibilityToggle())
  }
}

const _createNewFriendFromTempStoredFormInputs = () => { 
return (dispatch, getState) => {
    const { friendFormEventInput, friendFormNameInput } = getState().visible
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

// modal visibility toggle called
export const createFriend = () => {
  return dispatch => {
    dispatch(_createNewFriendFromTempStoredFormInputs());
    dispatch(friendFormEventInputClear())
    dispatch(_selectLastFriend());
    dispatch(friendFormVisibilityToggle());
  }
}