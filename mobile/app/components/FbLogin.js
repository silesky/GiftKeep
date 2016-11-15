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
const _serverUrl = 'http://localhost:3000';

export class FbLogin extends Component {
 sendFbAccessTokenToNode = (token) => {
    const fullRoute = `${_serverUrl}/api/auth/fb`;
    return fetch(fullRoute, {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
  render() {
    return (
          <View style={{justifyContent: 'center'}}>
            <Button transparent>
              <LoginButton
                readPermissions={["public_profile"]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("Login failed with error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("Login was cancelled");
                    } else{
                      // save access token to AsyncStorage
                      // send Access token to nodejs and save it there
                      //  
                      console.log("Login was successful with permissions: " + result.grantedPermissions)
                      AccessToken.getCurrentAccessToken().then((data) => {
                        const token = data.accessToken.toString()
                        console.log('data access token acquired... sending to node...');
                        Util.sendFbAccessTokenToNode(token)
                        Util.saveTokenToAsyncStorage(token)
                      })
                    }
                  }
                }
                onLogoutFinished={() => console.log("User logged out")}/>
            </Button>
          </View>
    );
  }
}