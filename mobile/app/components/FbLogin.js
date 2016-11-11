import React, { Component } from 'react';
import { 
  View,
} from 'react-native';
import {
  Button
} from 'native-base'

import { LoginButton } from 'react-native-fbsdk';

export class FbLogin extends Component {
  render() {
    return (
          <View style={{justifyContent: 'center'}}>
            <Button transparent>
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
            </Button>
          </View>
    );
  }
}