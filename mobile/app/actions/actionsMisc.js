
import * as Utils from './../utils/utils'

import { SERVER_URL } from './../serverConfig/'

export const giftInputFocus = (selectedGiftId) => {
  return {
    type: 'FOCUS_GIFT_INPUT',
    payload: { selectedGiftId, },
  }
}
export const createNotification = (text) => {
  return dispatch => {
    dispatch({ type: 'SET_NOTIFICATION_TEXT', payload: { notificationText: text } })
    dispatch({ type: 'BOTTOM_NOTIFICATION_VISIBILITY_TRUE' })
    setTimeout(() => {
      dispatch({ type: 'BOTTOM_NOTIFICATION_VISIBILITY_FALSE' })
      dispatch({ type: 'SET_NOTIFICATION_TEXT', payload: { notificationText: null } })
    }, 1000)
  }
}
export const hydrateAll = ({ user, visible, friendForm }) => {
  return dispatch => {
    dispatch({ type: 'HYDRATE_USER', payload: user })
    dispatch({ type: 'HYDRATE_VISIBLE', payload: visible })
    dispatch({ type: 'HYDRATE_FRIEND_FORM', payload: friendForm })
  }
}
export const resetAll = () => {
  return dispatch => {
    dispatch({ type: 'RESET_USER' })
    dispatch({ type: 'RESET_VISIBLE' })
  }
}
export const selectTab = (tabNum) => {
  let selectedTab
  switch (tabNum) {
    case 0:
      selectedTab = 'gifts'
      break
    case 1:
      selectedTab = 'events'
      break
    case 2:
      selectedTab = 'all gifts'
      break
    default:
      selectedTab = 'no tab selected'
  }
  return {
    type: 'SELECT_TAB', payload: { selectedTab }
  }
}

export const updateGiftDesc = (friendId, giftId, giftDesc) => {
  console.log('updateGift', friendId, giftId, giftDesc)
  return {
    type: 'UPDATE_GIFT_DESC',
    payload: { friendId, giftId, giftDesc }
  }
}

export const updateGiftTitle = (friendId, giftId, giftTitle) => {
  console.log('updateGift', friendId, giftId, giftTitle)
  return {
    type: 'UPDATE_GIFT_TITLE',
    payload: { friendId, giftId, giftTitle }
  }
}

export const deleteGift = (friendId, giftId) => {
  console.log('deleteGift:', friendId, giftId)
  return {
    type: 'DELETE_GIFT',
    payload: { friendId, giftId }
  }
}

export const selectFriend = (friendId) => {
  return {
    type: 'SELECT_FRIEND',
    payload: { friendId }
  }
}

const _deleteFriend = (friendId) => ({ type: 'DELETE_FRIEND', payload: { friendId } })

export const _selectLastFriend = () => {
  return (dispatch, getState) => {
    const state = getState().user.data
    const latestFriendId = state[state.length - 1].friendId
    dispatch(selectFriend(latestFriendId))
  }
}

const _selectNextFriend = (currentFriendId) => {
  console.log('selectNextFriend')
  return (dispatch, getState) => {
    const state = getState().user.data
    const nextInd = state.findIndex(el => el.friendId === currentFriendId) + 1 // get index
    if (state[nextInd]) dispatch(selectFriend(state[nextInd].friendId))
  }
}

export const deleteFriend = (friendId) => {
  return (dispatch, getState) => {
    const friendArr = getState().user.data
    const selectedFriendId = getState().visible.selectedFriendId
    // if you are deleting the same friend you're looking at, go to the next one.
    // if the friend you're looking at isn't the last one in the deck, you should go to the next one.
    // otherwise, it doesn't matter... just delete
    if (friendArr.length > 1 && friendId === selectedFriendId) {
      console.log(friendArr.length, 'friendArr')
      dispatch(_selectNextFriend(friendId))
    }
    dispatch(_deleteFriend(friendId))
  }
}

export const _friendEventAdd = (friendId, eventName, eventDate) => {
  return {
    type: 'CREATE_EVENT',
    payload: { friendId, eventName, eventDate }
  }
}

export const hydrateUser = (data) => {
  return {
    type: 'HYDRATE_USER',
    payload: data
  }
}

export const testClick = () => {
  return clear()
}
export const clear = () => ({ type: 'CLEAR' })

const _sendTokenToServer = (token) => {
  return fetch(`${SERVER_URL}/api/auth/fb`,
    {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}

export const saveFbPhoto = (uriOrBase64) => {
  return {
    type: 'SAVE_FB_PHOTO',
    payload: { fbImage: uriOrBase64 }
  }
}

export const authTokenAndTryToGetUser = (token) => {
  return dispatch => _sendTokenToServer(token)
    .then(({ payload, payload: { fbId } }) => {
      dispatch(hydrateUser(payload))
      Utils.fbGetPicURLById(fbId).then(url => dispatch(saveFbPhoto(url)))
    })
}
