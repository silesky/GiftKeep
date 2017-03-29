import {
  SERVER_URL,
} from './../serverConfig/';

export const fetchPost = (route, data) => {
  const fullRoute = `${SERVER_URL}/${route}`
  return fetch(fullRoute, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ data: data })
  })
}
export const sendFbAccessTokenToNode = (token) => {
  const fullRoute = `${SERVER_URL}/api/auth/fb`
  return fetch(fullRoute, {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const updateUserDataByAccessToken = (token, data) => {
  const fullRoute = `${SERVER_URL}/api/user/data/${token}`
  return fetch(fullRoute, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
export const updateUserByBody = (user) => {
  const fullRoute = `${SERVER_URL}/api/user/`
  return fetch(fullRoute, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
