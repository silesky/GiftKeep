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

handleToken = (token) => {
  const _serverUrl = 'http://localhost:3000';
  const _getUserDataByAccessToken = (token) => {
    const fullRoute = `${_serverUrl}/api/user/data/${token}}`;
    return fetch(fullRoute).then(res => res.json());
  }
   const _sendFbAccessTokenToNode = (token) => {
    const fullRoute = `${_serverUrl}/api/auth/fb`;
    return fetch(fullRoute, { 
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {'Content-Type': 'application/json'}
    })
}
  Util.saveTokenToAsyncStorage(token)
  // check if user exists
  // if access token exists, return data -
    // otherwise return error
  // if user doesn't exist, check if user is valid on facebook
  // if facebook says success, then create a new user with the token
  _sendFbAccessTokenToNode(token).then(res =>  {
    if (res.status !== 200) console.error(res)
  })
  _getUserDataByAccessToken(token)
  .then(res => {
    if (res.success) {
      this.props.hydrate(res.data);
    } else {
      console.error(res);
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
                        this.handleToken(token)
                  
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