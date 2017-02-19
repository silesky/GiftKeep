import React from 'react';
import { EI as Icon } from './../icons';
import {View} from 'react-native';
// https://exponent.github.io/vector-icons/
export const SwipeIcon = (name, stylesObj) => {
   return [
     <View key={1} style={{flex: 1, width: 10, height: 10, justifyContent: 'center'}}>
        <Icon
          name={name}
          style={{...stylesObj, alignSelf: 'center'}}
        />
      </View>
  ]
 }
