const initialState = {
  selectedFriendId: null,
  friendFormIsVisible: false,
  selectedTab: 'gifts',
  isLeftDrawerOpen: false,
  createGiftModalVisibility: true
}
export const visible = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEFT_DRAWER_OPEN_TRUE':
      {
        return {...state, isLeftDrawerOpen: true }
      }
    case 'SET_LEFT_DRAWER_OPEN_FALSE':
      {
        return {...state, isLeftDrawerOpen: false }
      }
    case 'RESET_VISIBLE':
      {
        return initialState
      }
    case 'SELECT_TAB':
      {
        return {...state, selectedTab: action.payload.selectedTab }
      }
    case 'HYDRATE_VISIBLE':
      {
        return { ...state, selectedFriendId: action.payload.selectedFriendId } // only save selectedFriendId
      }
    case 'SELECT_FRIEND':
      {
        return { ...state, selectedFriendId: action.payload.friendId }
      }
    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      {
        return {
          ...state,
          friendFormIsVisible: !state.friendFormIsVisible
        }
      }
    case 'SET_CREATE_GIFT_MODAL_VISIBILITY_TRUE':
      {
        return {
          ...state,
          createGiftModalVisibility: true
        }
      }
    case 'SET_CREATE_GIFT_MODAL_VISIBILITY_FALSE':
      {
        return {
          ...state,
          createGiftModalVisibility: false
        }
      }
    default:
      return state
  }
}
