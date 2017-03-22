import React from 'react'
import { EI as Icon } from './../icons'
import { View } from 'react-native'
// https://exponent.github.io/vector-icons/
export const SwipeIcon = (name, iconStylesObj = {}, wrapperStylesObj = {}) => {
  return [
    <View key={1} style={{ flex: 1, justifyContent: 'center', ...wrapperStylesObj, }}>
        <Icon
          name={name}
          style={{ ...iconStylesObj, alignSelf: 'center' }}
        />
      </View>
  ]
}
