import React from 'react'
import { ListItem, Text } from 'native-base'
import { colors } from './../themes/'
export const ListItemDivider = ({ heading }) => {
  return (
    <ListItem style={{ backgroundColor: colors.darkgrey }} itemDivider>
      <Text
        style={{
          color: 'white',
        }}
      >
        {heading}
      </Text>
    </ListItem>
  )
}
