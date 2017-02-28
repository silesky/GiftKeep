// friendId
const _addEmptyGift = (friendId) =>({ type: 'ADD_GIFT', payload: { friendId } })
export const addGift = (friendId) => {
  return (dispatch) => {
    //dispatch(_addEmptyGift(friendId));
    dispatch(createGiftModalVisibilityTrue());
  }
}

export const createGiftModalVisibilityTrue = () => {
  return { type: 'SET_CREATE_GIFT_MODAL_VISIBILITY_TRUE' }
}
export const createGiftModalVisibilityFalse = () => {
  return { type: 'SET_CREATE_GIFT_MODAL_VISIBILITY_FALSE' }
}

export const leftDrawerVisibility = (bool) => {
  console.log('called!')
  return bool
    ? { type: 'SET_LEFT_DRAWER_OPEN_TRUE' }
    : { type: 'SET_LEFT_DRAWER_OPEN_FALSE' }
}
export const setLeftDrawerOpenFalse = () => ({type: 'SET_LEFT_DRAWER_OPEN_FALSE'})
