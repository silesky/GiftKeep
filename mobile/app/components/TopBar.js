import React from 'react'
import { Header, Title, Button, Icon } from 'native-base'
import { colors } from '../themes/'
import { IconCreator } from './../icons/'

export const TopBar = ({
  handleOpenDrawer,
  friendName,
  eventBtnIsDisabled,
  eventModalShow,
  giftBtnIsDisabled,
  addEvent,
  giftModalShow,
  selectedTab,
}) => {
  const iconColor = {
    color: colors.$defaultIconColor,
  }
  const iconOpacity = {
    opacity: giftBtnIsDisabled ? 0.5 : 1,
  } // if user has no friends, disable
  const addEventBtn = (
    <Button
      disabled={eventBtnIsDisabled}
      transparent
      onPress={() => eventModalShow()}
    >
      {IconCreator('FA', 'calendar-plus-o', 20, {
        ...iconColor,
        ...iconOpacity,
        fontSize: 22,
      })}
    </Button>
  )
  const addGiftBtn = (
    <Button
      disabled={giftBtnIsDisabled}
      transparent
      onPress={() => giftModalShow()}
    >
      {' '}{/* */}
      {IconCreator('FA', 'gift', 20, {
        ...iconColor,
        ...iconOpacity,
        fontSize: 25,
      })}
    </Button>
  )
  return (
    <Header backgroundColor={colors.$headerFooterBg}>
      <Button transparent onPress={() => handleOpenDrawer()}>
        <Icon
          style={{
            ...iconColor,
          }}
          name='ios-menu'
        />
      </Button>
      <Title
        style={{
          color: colors.$bigHeadingTextColor,
        }}
      >
        {friendName || 'Add a friend.'}
      </Title>
      {selectedTab === 'gifts' ? addGiftBtn : false}
      {selectedTab === 'events' ? addEventBtn : false}
    </Header>
  )
}
