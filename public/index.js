const fetchPost = (route, data) => {
    return fetch(route, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  })
}
const server_url = "http://gifter.sethsilesky.com:3000/oauthcallback";

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  fetchPost(server_url, profile).then(res => console.log(res));
}
