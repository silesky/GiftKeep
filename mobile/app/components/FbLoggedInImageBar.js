import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Thumbnail,
  Content,
  Header,
  Container,
  Text,
  Title,
  Footer,
  Card,
  CardItem,
} from 'native-base';

const FbLoggedInImageBar = ({fbImage, userName}) => (
  <View style={Styles.FbLoggedInImageBar}>
      <Text>{userName}</Text>
      <Thumbnail source={{ uri: fbImage, width: 25, height: 25, scale: 3 }} />
  </View>
)
FbLoggedInImageBar.PropTypes = {
  userName: React.PropTypes.string,
  fbImage: React.PropTypes.string,
}
const Styles = StyleSheet.create({
  FbLoggedInImageBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'

  }
})
export default FbLoggedInImageBar;
