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
import {IconCreator} from './../icons/'

export const TopBar = ({drawerOpen, friendName, addGift}) => {
  return (
    <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
      <Button transparent onPress={() => drawerOpen()}>
        <Icon name='ios-menu'/>
      </Button>
      <Title style={{
        color: colors.$bigHeadingTextColor
      }}>{friendName || 'Gifter'}</Title>
      <Button transparent onPress={() => addGift()}>
        {IconCreator('pencil', 20, { fontSize: 25 })}
      </Button>
    </Header>

  )
}
