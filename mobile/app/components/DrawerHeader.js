// import liraries
import React, {
  Component,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Title,
  Icon,
  Header,
} from 'native-base'

import { colors } from './../themes/';
// create a component
export const DrawerHeader = ({
  friendFormVisibilityToggle,
  drawerHeaderTitle
}) => {
  return (
    <Header style={Styles.Header}>
      <Button transparent>{``}</Button>
      <Title style={Styles.Title}>
        { drawerHeaderTitle }
      </Title>
      <Button
        iconRight
        onPress={() => friendFormVisibilityToggle()}
        transparent>
        <Icon
          style={Styles.Icon}
          name='ios-person-add'/>
      </Button>
    </Header>
  )
}


const Styles = StyleSheet.create({
  Header: {
    backgroundColor: colors.$headerFooterBg,
  },
  Icon: {
    color: colors.$defaultIconColor,
  },
  Title: {
    color: colors.$bigHeadingTextColor,
  },
})



