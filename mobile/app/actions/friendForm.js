import * as Utils from './../utils/utils'
import { _selectLastFriend } from './index'

export const friendFormAddEvent = (friendId, eventName, eventDate) => { // TODO: hook it up!
  return {
    type: 'ADD_EVENT',
    payload: { friendId, eventName, eventDate }
  }
}

export const friendFormVisibilityToggle = () => ({ type: 'FRIEND_FORM_VISIBILITY_TOGGLE' })

export const friendFormNameInputUpdate = inputNameValue => ({
  type: 'FRIEND_FORM_NAME_INPUT', payload: inputNameValue
})

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
    dispatch(friendFormVisibilityToggle());
  }
}

const friendFormUpdatingStatusChange = (arg) => {
  return (arg)
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

export const updateFriend = (friendId, updatedFriendName, friendFormEventInputs) => {
  console.log('UPDATE_FRIEND', friendFormEventInputs);
  return dispatch => {
    dispatch({ type: 'UPDATE_FRIEND',
     payload: { friendId, 
       friendName: updatedFriendName, 
       friendFormEventInputs: friendFormEventInputs } 
    })
    dispatch(friendFormUpdatingStatusChange(false))
    dispatch(friendFormVisibilityToggle())
  }
}


export const _createFriend = (friendName, bday) => ({ type: 'CREATE_FRIEND', payload: { friendName, bday } });
// modal visibility toggle called
export const createFriend = (friendName, bday) => {
  bday = (bday) ? bday : '???';
  return (dispatch) => {
    dispatch(_createFriend(friendName, bday));
    dispatch(_selectLastFriend());
    dispatch(friendFormVisibilityToggle());
  }
}