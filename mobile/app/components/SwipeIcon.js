import React from 'react';
import { StyleSheet } from 'react-native';
import { EI as Icon } from './../icons';
// https://exponent.github.io/vector-icons/
export const SwipeIcon = (name, stylesObj) => {
   const Styles = StyleSheet.create({
      swipeIcons: {
        fontSize: 30,
        marginTop: 12,
        alignSelf: 'center',
      }
    })
   const styles = (stylesObj) ? {...stylesObj, alignSelf: 'center'} : Styles.swipeIcons;
   return [<Icon 
            name={name}
            key={1} 
            style={styles}
            />
  ]
 }