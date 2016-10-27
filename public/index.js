console.log('index.js loaded.');
const fetchPost = (route, data) => {
  console.log(typeof data);
  return fetch(route, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({data: data}),
  })
}
const server_url = "http://gifter.sethsilesky.com:3000/oauthcallback";


function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  let idToken = googleUser.getAuthResponse().id_token;
  fetchPost(server_url, idToken).then(res => console.log(res.statusText));
}
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
