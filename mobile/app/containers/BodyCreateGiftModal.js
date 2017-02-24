import React from 'react'
import { Dimensions } from 'react-native';
import * as actions from './../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ModalFormWrapper, GiftCard } from './../components/'

import { View } from 'react-native'
import {
  Body,
  Card,
  CardItem,
  Text,
  Container,
  Footer,
  Content,
  Header,
  Title
} from 'native-base'

export class BodyCreateGiftModal extends React.Component {
  static PropTypes = {
    CreateGiftModalIsVisible: React.PropTypes.bool
  }
  render() {
    const { height, width } = Dimensions.get('window') // gets width of entire display
    return (
      <View style={{position: 'absolute', height: height, width: width, zIndex: 999}}>
        <ModalFormWrapper
          handleClickAway={this.props.actions.createGiftModalVisibilityFalse}
          isVisible={this.props.createGiftModalVisibility}>
        >
          <Text>
          Hello World
          </Text>
        </ModalFormWrapper>
      </View>
    )
  }
}

const mstp = (state) => {
  return { createGiftModalVisibility: state.visible.createGiftModalVisibility }
}
const mdtp = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mstp, mdtp)(BodyCreateGiftModal)
