import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Button
} from  './../sporks/native-base'
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'
import FbProfImage from './../components/FbProfImage'

export const FbLogin = ({ authTokenAndTryToGetUser, clear, userName, fbImage }) => {
  return (
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ marginRight: 20 }} transparent>
              <LoginButton
                style={{
                  height: 40,
                  width: 100
                }}
                readPermissions={[ 'public_profile' ]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log('Login failed with error: ' + result.error)
                    } else if (result.isCancelled) {
                      console.log('Login was cancelled')
                    } else {
                      // save access token to AsyncStorage
                      // send Access token to nodejs and save it there
                      //
                      console.log('Login was successful with permissions: ' + result.grantedPermissions)
                      AccessToken.getCurrentAccessToken().then((data) => {
                        const token = data.accessToken.toString()
                        console.log('data access token acquired... sending to node...')
                        authTokenAndTryToGetUser(token)
                      })
                    }
                  }
                }
                onLogoutFinished={() => {
                  clear()
                  console.log('User logged out')
                }}/>
            </Button>
            <FbProfImage fbImage={fbImage} />
          </View>
  )
}
