import React from 'react'
import { Ion, FA, EI, Entypo, Fdtn } from './../icons'
import {View} from 'react-native'
// https://exponent.github.io/vector-icons/
export const IconCreator = (type, name, size, stylesObj = {}) => {
  let newIcon
  const iconStyles = { alignSelf: 'center', fontSize: 25, ...stylesObj }
  switch (type) {
    case 'EI':
      newIcon = <EI name={name} style={iconStyles} />
      break
    case 'FA':
      newIcon = <FA name={name} style={iconStyles} />
      break
    case 'Ion':
      newIcon = <Ion name={name} style={iconStyles} />
      break
    default:
      break
  }
  return [
    <View key={1} style={{ flex: 1, justifyContent: 'center', height: size, width: size }}>
      {newIcon}
    </View>
  ]
}
