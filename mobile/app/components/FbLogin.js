import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import { Button } from 'native-base'
import { LoginButton, AccessToken } from 'react-native-fbsdk'
import FbProfImage from './../components/FbProfImage'
class FbLogin extends Component {
  render () {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button style={{ marginRight: 20 }} transparent>
          <LoginButton
            style={{
              height: 40,
              width: 100,
            }}
            readPermissions={[ 'public_profile' ]}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('Login failed with error: ' + result.error)
              } else if (result.isCancelled) {
                console.log('Login was cancelled')
              } else {
                // save access token to AsyncStorage
                // send Access token to nodejs and save it there
                //
                console.log(
                  'Login was successful with permissions: ' +
                    result.grantedPermissions
                )
                AccessToken.getCurrentAccessToken().then(data => {
                  const token = data.accessToken.toString()
                  console.log(
                    'data access token acquired... sending to node...'
                  )
                  this.props.actions.authTokenAndTryToGetUser(token)
                })
              }
            }}
            onLogoutFinished={() => {
              this.props.actions.clear()
              console.log('User logged out')
            }}
          />
        </Button>
        {this.props.isLoggedIn && <FbProfImage fbId={this.props.fbId} />}
      </View>
    )
  }
}

const mdtp = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})
const mstp = state => {
  return {
    isLoggedIn: !!state.user.fbId,
    fbId: state.user.fbId,
    fbAccessToken: state.user.fbAccessToken,
  }
}

const connected = connect(mstp, mdtp)(FbLogin)
export { connected as FbLogin }
