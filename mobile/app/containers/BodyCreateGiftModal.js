import React from 'react'

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
  render () {
    return (
      <View style={{ position: 'relative', zIndex: 999, top: 10 }} onPress={() => this.props.actions.createGiftModalVisibilityFalse()}>
        <ModalFormWrapper visible={this.props.createGiftModalVisibility}>
          <Content>
          <GiftCard />
          </Content>
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
