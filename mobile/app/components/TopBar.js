import React from 'react'

import {
  Header,
  Title,
  Button,
  Text,
  Icon,
  Container
} from 'native-base'

import colors from '../themes/colors'
import LightTheme from '../themes/LightTheme'
import { IconCreator } from './../icons/'
import { selectTab } from '../actions/actionsMisc'

export const TopBar = ({ handleOpenDrawer, friendName, addEvent, addGift, selectedTab }) => {
  const addEventBtn = (
    <Button transparent onPress={() => addEvent()}>
      {IconCreator('FA', 'calendar-plus-o', 20, { fontSize: 22 })}
        </Button>
  )
  const addGiftBtn = (
    <Button transparent onPress={() => addGift()}>
    {IconCreator('FA', 'gift', 20, { fontSize: 25 })}
    </Button>
  )
  return (
    <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
      <Button transparent onPress={() => handleOpenDrawer() }>
        <Icon name='ios-menu'/>
      </Button>
      <Title style={{ color: colors.$bigHeadingTextColor }}>
        {friendName || 'Gifter'}
      </Title>
      {(selectedTab === 'gifts') ? addGiftBtn : false}
      {(selectedTab === 'events') ? addEventBtn : false}
    </Header>

  )
}
