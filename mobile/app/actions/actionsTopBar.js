// friendId
export const createGift = (friendId, giftTitle, giftDesc) =>({
  type: 'CREATE_GIFT',
  payload: { friendId, giftTitle, giftDesc }
})

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
