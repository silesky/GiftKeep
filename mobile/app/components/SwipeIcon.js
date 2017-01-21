import React from 'react';
import { StyleSheet } from 'react-native';
import { EI as Icon } from './../icons';
// https://exponent.github.io/vector-icons/
export const SwipeIcon = (name) => {
   const Styles = StyleSheet.create({
      swipeIcons: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 12
      }
    })
   return [<Icon 
            name={name}
            key={1} 
            style={Styles.swipeIcons}
            />
  ]
 }