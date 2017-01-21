import React from 'react';
import { StyleSheet } from 'react-native';
import { EI as Icon } from './../icons';
import {View} from 'react-native';
// https://exponent.github.io/vector-icons/
export const SwipeIcon = (name, stylesObj) => {
   const Styles = StyleSheet.create({
      swipeIcons: {
        alignSelf: 'center',
      }
    })
   const styles = (stylesObj) ? {...stylesObj, alignSelf: 'center'} : Styles.swipeIcons;
   return [
     <View key={1} style={{flex:1, justifyContent: 'center'}}>
            <Icon 
            name={name}
            style={styles}
            />
      </View>
  ]
 }