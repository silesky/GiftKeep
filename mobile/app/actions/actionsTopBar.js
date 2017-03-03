// friendId
export const createGift = (friendId, giftTitle, giftDesc) => ({
  type: 'CREATE_GIFT',
  payload: { friendId, giftTitle, giftDesc }
})

export const createEvent = (friendId, eventName, eventDate) => ({
  type: 'CREATE_EVENT',
  payload: { friendId, eventName, eventDate }
})

export const createGiftModalVisibilityTrue = () => ({ type: 'SET_CREATE_GIFT_MODAL_VISIBILITY_TRUE' })
export const bodyModalVisibilityFalse = () => ({ type: 'SET_BODY_MODAL_VISIBILITY_FALSE' })
export const createEventModalVisibilityTrue = () => ({ type: 'SET_CREATE_EVENT_MODAL_VISIBILITY_TRUE' })
export const createEventModalVisibilityFalse = () => ({ type: 'SET_CREATE_EVENT_MODAL_VISIBILITY_FALSE' })
export const leftDrawerVisibility = (bool) => {
  console.log('called!')
  return bool
    ? { type: 'SET_LEFT_DRAWER_OPEN_TRUE' }
    : { type: 'SET_LEFT_DRAWER_OPEN_FALSE' }
}
export const setLeftDrawerOpenFalse = () => ({ type: 'SET_LEFT_DRAWER_OPEN_FALSE' })
