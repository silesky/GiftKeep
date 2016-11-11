import React from 'react';
import { Container } from 'native-base';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
      
export const FbLogin = React.createClass({
  render: function() {
    return (
        <LoginButton
          readPermissions={["public_profile", "user_friends"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
    );
  }
});