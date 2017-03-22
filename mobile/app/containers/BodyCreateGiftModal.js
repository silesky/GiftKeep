import React from 'react'
import {
  Dimensions,
  View,
  LayoutAnimation,
} from 'react-native'
import * as actions from './../actions/'

import { IconCreator } from './../icons/'
import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'
import {
  BodyCreateGiftFooterBtn,
  SimpleModalFormWrapper,
}
from './../components/'
import { getFriendByFriendId, } from './../utils/'
import {
  Input,
  List,
  ListItem,
  Title,
  InputGroup,
} from './../sporks/native-base'

class BodyCreateGiftModal extends React.Component {
  constructor () {
    super()
    this.onCancelPress = this.onCancelPress.bind(this)
    this.onCreateGiftPress = this.onCreateGiftPress.bind(this)
  }
  static PropTypes = {
    CreateGiftModalIsVisible: React.PropTypes.bool,
  }
  onCreateGiftPress () {
    // const _giftTitleInput = this.refs.giftTitleInput._textInput._lastNativeText
    const _giftDescInput = this.refs.giftDescInput._textInput._lastNativeText
    this.props.actions.createGift(this.props.selectedFriendId, /*_giftTitleInput*/ '', _giftDescInput)
    this.onCancelPress()
  }
  onCancelPress () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.bodyModalVisibilityFalse()
  }
  render () {
  const { height, width, } = Dimensions.get('window') // gets width of entire display

  return (
    <View
      style={{
        position: 'absolute',
        height: height,
        width: width,
        zIndex: 999,
      }}>
      <SimpleModalFormWrapper
        height={170}
        handleClickAway={this.props.actions.bodyModalVisibilityFalse}
        isVisible={this.props.createGiftModalVisibility}
       >
        <List>

          <Title style={{ marginTop: 10, marginBottom: 10, }}>
          { IconCreator('FA', 'gift', 30, { paddingRight: 10, paddingTop: 5, }) }
            Create Gift
         </Title>

          {/*
              <ListItem>
            <InputGroup>
            <Input
              ref="giftTitleInput"
              placeholder="Title..."
              inlineLabel label="Title"
              placeholderTextColor='lightgrey'
              multiline={false}
              />
          </InputGroup>
          </ListItem>
          */}

          <ListItem>
            <InputGroup>
            <Input
              ref="giftDescInput"
              placeholder="Description..."
              placeholderTextColor='lightgrey'
              multiline={true}
              style={{height: 200}}
              onSubmitEditing={() => this.onCreateGiftPress()}
            />
          </InputGroup>
        </ListItem>
        <BodyCreateGiftFooterBtn
          onOkPress={this.onCreateGiftPress}
          onCancelPress={this.onCancelPress}
          />
      </List>
    </SimpleModalFormWrapper>
  </View>
  )
}
}
const mstp = (state) => {
  const { gifts, } = getFriendByFriendId(state, state.visible.selectedFriendId)
  return {
    latestGift: gifts[gifts.length - 1],
    createGiftModalVisibility: state.visible.createGiftModalVisibility,
    selectedFriendId: state.visible.selectedFriendId,
  }
}
const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})
export default connect(mstp, mdtp)(BodyCreateGiftModal)
