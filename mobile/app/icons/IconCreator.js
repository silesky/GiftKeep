import React from 'react';
import { EI as Icon } from './../icons';
import {View} from 'react-native';
// https://exponent.github.io/vector-icons/
export const IconCreator = (name, size, stylesObj = {}) => {
   return [
     <View key={1} style={{flex: 1, justifyContent: 'center', height: size, width: size}}>
        <Icon
          name={name}
          style={{alignSelf: 'center', fontSize: 25, ...stylesObj }}
        />
      </View>
  ]
 }
