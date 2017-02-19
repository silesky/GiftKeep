const initialState = {
  selectedFriendId: null,
  friendFormIsVisible: false,
  selectedTab: 'gifts',
  isLeftDrawerOpen: false
}
export const visible = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEFT_DRAWER_OPEN_TRUE':
      {
        return { ...state, isLeftDrawerOpen: true }
      }
    case 'SET_LEFT_DRAWER_OPEN_FALSE':
      {
        return { ...state, isLeftDrawerOpen: false }
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
        return action.payload
      }
    case 'SELECT_FRIEND':
      {
        return {...state, selectedFriendId: action.payload.friendId }
      }
    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      {
        return {
          ...state,
          friendFormIsVisible: !state.friendFormIsVisible
        }
      }
    default:
      return state
  }
}
