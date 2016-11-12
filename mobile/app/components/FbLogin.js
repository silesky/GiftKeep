import React, { Component } from 'react';
import * as Util from './../utils/util'
import { 
  View,
} from 'react-native';
import {
  Button,
} from 'native-base'
import { 
  LoginButton, 
  AccessToken,
} from 'react-native-fbsdk';

export class FbLogin extends Component {
  render() {
    return (
          <View style={{justifyContent: 'center'}}>
            <Button transparent>
              <LoginButton
                readPermissions={["public_profile"]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert("Login failed with error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("Login was cancelled");
                    } else {
                      // save access token to AsyncStorage
                      // send Access token to nodejs and save it there
                      // 
                      alert("Login was successful with permissions: " + result.grantedPermissions)
                      AccessToken.getCurrentAccessToken().then((data) => {
                        const token = data.accessToken.toString()
                        console.log('data access token acquired... sending to node...');
                        Util.sendFbAccessTokenToNode(token)
                        Util.saveTokenToAsyncStorage(token)
                      })
                    }
                  }
                }
                onLogoutFinished={() => alert("User logged out")}/>
            </Button>
          </View>
    );
  }
}