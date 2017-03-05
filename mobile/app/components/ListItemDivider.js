import React from 'react'
import { ListItem, Text } from  './../sporks/native-base'
import { LightTheme } from './../themes/';
export const ListItemDivider = ({ heading }) => {
  return (
    <ListItem theme={LightTheme} itemDivider>
      <Text style={{
        color: 'white'
      }}>{heading}</Text>
    </ListItem>
  )
}
