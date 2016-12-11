import defaultFriend from './../json/defaultFriend.json';
import { 
  AsyncStorage, 
  ImageStore
 } from 'react-native';

const _serverUrl = 'http://localhost:3000';

const log = (el) => {
 console.log('array!', el)
 return el; 
};
export const lipsum = 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.'
export const compose = (f1, f2) => value => f1(f2(value));

export const getFriendItemById = (state, friendId, key) => {

  const friend = state.user.data.find(el => el.friendId === friendId);

  // my fallback return should depends on what is being asked for. 
  // null breaks the app if 
  let defItem;
  switch (key) {
    case 'gifts':
      defItem = [];
      break;
    case 'bday':
      defItem = '';
      break;
    default:
      defItem = null;
  }
  return (friend && friend.hasOwnProperty(key)) ? friend[key] : defItem;
}

export const fetchPost = (route, data) => {
  const fullRoute = `${_serverUrl}/${route}`
  return fetch(fullRoute, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ data: data }),
  })
}
export const sendFbAccessTokenToNode = (token) => {
  const fullRoute = `${_serverUrl}/api/auth/fb`;
  return fetch(fullRoute, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const updateUserDataByAccessToken = (token, data) => {
  const fullRoute = `${_serverUrl}/api/user/data/${token}`;
  return fetch(fullRoute, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
export const updateUserByBody = (user) => {
  const fullRoute = `${_serverUrl}/api/user/`;
  return fetch(fullRoute, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}


export const saveToAsyncStorage = async (key, value, callback) => {
  const valueStr = (typeof value === 'object' || 'array') ? JSON.stringify(value) : value;
  try {
    return await AsyncStorage.setItem(key, valueStr, callback);
  } catch (err) {
    return console.log('error caught!', err)
  }
}

export const getFromAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  }
  catch (e) {
    console.log('caught error', e);

  }
}

export const getGiftByGiftId = (state, giftId) => {
  const giftObj = state.user.data
    .filter(el => el.gifts.length)
    .map(el => el.gifts)
    .reduce((p, n) => p.concat(n), [])
    .find(el => el.giftId === giftId)
  return (giftObj.giftId) ? giftObj : false;
}
export const getAllGifts = (state) => {
  const allGiftsList = state.user.data
    .filter(el => el.gifts.length)
    .map(el => el.gifts)
    .reduce((p, n) => p.concat(n), [])
  return (allGiftsList.length) ? allGiftsList : [];
}

export const getFriendByFriendId = (state, friendId) => {
  const friendObj = state.user.data.find(el => el.friendId === friendId);
  return (friendObj) ? friendObj : false;
}
export const getFriendNameById = (state, friendId) => {
  let friendName = getFriendByFriendId(state, friendId).friendName;
  return (friendName) ? friendName : false;
}
export const getFriendByGiftId = (state, gid) => {
  let friendObj = {}
  state.user.data.forEach((eachFriend, ind, arr) => {
    const foundGift = eachFriend.gifts.find(eachGift => {
      return eachGift.giftId === gid
    })
    if (foundGift) friendObj = arr[ind]
  })
  return (friendObj.friendId) ? friendObj : false;
}

// not using any more
export const fbGetPicURLById = (fbId) => {
     return fetch(`https://graph.facebook.com/v2.8/${fbId}/picture`)
          .then(({url}) => url)
}
 export const fbGetBase64PicById = (userId) => {
 const urlStringToGetUserPhoto = "https://graph.facebook.com/v2.8/${userId}/picture"
 const _toDataURL = (url) =>  {
   return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }))
     .catch(err => console.log({
       error: err, 
       message: `cant get image or convert blob to datauri. the url: ${url} and userId: ${userId}. error: ${err}`
    }))
  }
  return _toDataURL(urlStringToGetUserPhoto)
}