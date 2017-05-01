import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Card, CardItem, Icon, Content } from 'native-base'

export const GiftEventCardFooter = ({ friendName, onBtnPress }) => {
  return (
    <CardItem style={styles.footerCard}>
      <Button onBtnPress={() => onBtnPress()}
        style={styles.button}
        disabled
        small
        textStyle={{
          color: 'white'
        }}
      >
        { friendName }
      </Button>
    </CardItem>
  )
}
const styles = StyleSheet.create({
  footerCard: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: 'purple',
  },
})

