import React from 'react'
import {Footer, FooterTab, Button, Icon, Text} from 'native-base'
import { colors } from '../themes/'
export const BottomBar = ({addGift, addEvent, friendFormVisibilityToggle, selectedTab}) => {
  const whichBtn = () => {
    let addBtn = {}
    switch (selectedTab) {
      case 'gifts':
        addBtn = {
          text: 'ADD GIFT',
          handler: addGift,
          icon: 'ios-add-circle-outline'
        }
        break
      case 'events':
        addBtn = {
          text: 'ADD EVENT',
          handler: addEvent,
          icon: 'md-calendar'
        }
        break
      case 'all gifts':
        addBtn = {
          text: 'ADD GIFT',
          handler: addGift,
          icon: 'ios-add'
        }
        break
    }

    return addBtn
  }

  return (
    <Footer backgroundColor={colors.$headerFooterBg}>
      <FooterTab>
        <Button onPress={() => whichBtn().handler()} transparent>
          <Text>{whichBtn().text}</Text>
          <Icon name={whichBtn().icon}/>
        </Button>
      </FooterTab>
    </Footer>
  )
}

BottomBar.PropTypes = {
  friendFormVisibilityToggle: React.PropTypes.bool,
  selectedTab: React.PropTypes.oneOf(['gifts', 'events', 'all gifts']),
  addBtnHandler: React.PropTypes.obj
}
