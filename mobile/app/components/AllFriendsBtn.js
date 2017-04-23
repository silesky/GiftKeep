//import liraries
import React, {
  Component
} from 'react';
import { View } from 'react-native';
import { Text, ListItem } from 'native-base'
import { colors as C } from './../themes/'
// create a component
export const AllFriendsBtn = ({ onBtnPress, isSelected }) => {
  const backgroundColor = isSelected
    ?  C.$tabBgActive : C.$tabBgInactive
  const color = isSelected
    ? C.$tabTextColorActive : C.$tabTextColorInactive
  return (
    <View style={{ backgroundColor }}>
      <ListItem
        button
        style={{
          height: 60
        }}
        onPress={() => onBtnPress()}>
        <Text
          style={{
          color,
          fontWeight: '500',
          fontSize: 20,
        }}>All Friends</Text>
      </ListItem>
    </View>
  );
};
