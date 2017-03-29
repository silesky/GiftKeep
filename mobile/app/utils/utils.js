import { AsyncStorage } from 'react-native'

export const getEventArrByEventId = (state, eventId) => {
 // getEventArrByEventId(state['user'], 111)

  let newEvents = []
  state.data.map(eachFriend => {
    eachFriend.events.map((eachEvent, undefined, eventArr) => {
      if (eachEvent.eventId === eventId) {
        newEvents = eventArr
      }
    })
  })

  return newEvents
}
export const getEventArrAndDeleteEvent = (state, eventId) => {
  const modEvents = getEventArrByEventId(state, eventId)
   .filter(el => el.eventId !== eventId)
  return modEvents
}
export const getAllEvents = (state) => {  // getAllEvents(state)
  let allEvents = state.user.data
  .map(eachFriend => eachFriend.events)
  return (allEvents.length)
  ? allEvents.reduce((p, n) => p.concat(n)) // don't want to 'reduce of empty array with no initial value'
  : []
}

export const getAnEventByEventId = (state, eventId) => getAllEvents(state).find(eachEvent => eachEvent.eventId === eventId)

export const getEventsByFriendId = (state, friendId) => {
  const friendObj = getFriendByFriendId(state, friendId)
  return (friendObj) ? friendObj.events : false
}

export const getFriendItemById = (state, friendId, key) => {
  const friend = state.user.data.find(el => el.friendId === friendId)
  // my fallback return should depends on what is being asked for.
  // null breaks the app if
  let defItem
  switch (key) {
    case 'gifts':
      defItem = []
      break
    case 'bday':
      defItem = ''
      break
    default:
      defItem = null
  }
  return (friend && friend.hasOwnProperty(key)) ? friend[key] : defItem
}



export const saveToAsyncStorage = async (key, value, callback) => {
  const valueStr = (typeof value === 'object' || 'array') ? JSON.stringify(value) : value
  try {
    return await AsyncStorage.setItem(key, valueStr, callback)
  } catch (err) {
    return console.log('error caught!', err)
  }
}

export const getFromAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('caught error', e)
  }
}

export const getGiftByGiftId = (state, giftId) => {
  const giftObj = state.user.data
    .filter(el => el.gifts.length)
    .map(el => el.gifts)
    .reduce((p, n) => p.concat(n), [])
    .find(el => el.giftId === giftId)
  return (giftObj.giftId) ? giftObj : false
}
export const getAllGifts = (state) => {
  const allGiftsList = state.user.data
    .filter(el => el.gifts.length)
    .map(el => el.gifts)
    .reduce((p, n) => p.concat(n), [])
  return (allGiftsList.length) ? allGiftsList : []
}

export const getFriendByFriendId = (state, friendId) => {
  const friendObj = state.user.data.find(el => el.friendId === friendId)
  return (friendObj) || false
}
export const getFriendNameById = (state, friendId) => {
  let friendName = getFriendByFriendId(state, friendId).friendName
  return (friendName) || false
}
export const getFriendByGiftId = (state, gid) => {
  let friendObj = {}
  state.user.data.forEach((eachFriend, ind, arr) => {
    const foundGift = eachFriend.gifts.find(eachGift => {
      return eachGift.giftId === gid
    })
    if (foundGift) friendObj = arr[ind]
  })
  return (friendObj.friendId) ? friendObj : false
}
export const getFriendByEventId = (state, eventId) => {
  let friendObj = {}
  state.user.data.forEach((eachFriend, ind, arr) => {
    const foundEvent = eachFriend.events.find(eachEvent => {
      return eachEvent.eventId === eventId
    })
    if (foundEvent) friendObj = arr[ind]
  })
  return (friendObj.friendId) ? friendObj : false
}
// not using any more
export const fbGetPicURLById = (fbId) => {
  return fetch(`https://graph.facebook.com/v2.8/${fbId}/picture`)
          .then(({ url }) => url)
}
export const fbGetBase64PicById = (userId) => {
  const urlStringToGetUserPhoto = 'https://graph.facebook.com/v2.8/${userId}/picture'
  const _toDataURL = (url) => {
    return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
     .catch(err => console.log({
       error: err,
       message: `cant get image or convert blob to datauri. the url: ${url} and userId: ${userId}. error: ${err}`
     }))
  }
  return _toDataURL(urlStringToGetUserPhoto)
}
