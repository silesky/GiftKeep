import React from 'react'
import { Dimensions, View, LayoutAnimation, Keyboard } from 'react-native'
import * as actions from './../actions/'

import { IconCreator } from './../icons/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BodyCreateThingModalFooterBtn, SimpleModalFormWrapper } from './../components/'
import { getFriendByFriendId } from './../utils/'
import { Input, List, ListItem, Title, InputGroup } from 'native-base'

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
    const _giftDescInput = this.refs.giftDescInput._textInput._lastNativeText
    this.props.actions.createGift(
      this.props.selectedFriendId,
      /* _giftTitleInput */ '',
      _giftDescInput
    )
    this.onCancelPress()
  }
  onCancelPress () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.bodyModalVisibilityFalse()
  }

  render () {
    const { height, width } = Dimensions.get('window') // gets width of entire display
    const IconGift = IconCreator('FA', 'gift', 30, { paddingRight: 10, paddingTop: 5 })
    return (
      <View
        style={{
          position: 'absolute',
          height: height,
          width: width,
          zIndex: 999,
        }}
      >
        <SimpleModalFormWrapper
          modalHeight={320}
          handleClickAway={this.props.actions.bodyModalVisibilityFalse}
          isVisible={this.props.createGiftModalVisibility}
        >
          <List>
            <Title style={{ marginTop: 10, marginBottom: 10 }}>
            { IconGift }
              Create Gift
            </Title>
            <ListItem>
              <InputGroup>
                <Input
                  ref='giftDescInput'
                  placeholder='Description...'
                  placeholderTextColor='lightgrey'
                  multiline={true}
                  style={{ height: 100 }}
                  onSubmitEditing={() => this.onCreateGiftPress()}
                />
              </InputGroup>
            </ListItem>
            <BodyCreateThingModalFooterBtn
              okDisabled={!this.props.selectedFriendId}
              onOkPress={this.onCreateGiftPress}
              onCancelPress={this.onCancelPress}
            />
          </List>
        </SimpleModalFormWrapper>
      </View>
    )
  }
}
const mstp = state => {
  const { gifts } = getFriendByFriendId(state, state.visible.selectedFriendId)
  return {
    createGiftModalVisibility: state.visible.createGiftModalVisibility,
    selectedFriendId: state.visible.selectedFriendId,
  }
}
const mdtp = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})
const connected = connect(mstp, mdtp)(BodyCreateGiftModal)
export { connected as BodyCreateGiftModal }
