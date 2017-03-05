import React, { PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { colors } from './../themes/'
import {
  Button,
  Card,
  CardItem,
  Icon
} from  './../sporks/native-base'
// import * as Util  from './../utils/utils';
import {
  GiftCardInputTitle,
  GiftCardInputGiftDescription,
  SwiperWrapper
} from './../components/'
export const GiftCard = ({
  deleteGift,
  friendId,
  friendName,
  giftDesc,
  giftTitle,
  updateGiftDesc,
  updateGiftTitle,
  footerIsVisible
}) => {
  // should take a name, birthday and text prop, along with being editable and so
  // forth
  return (
    <SwiperWrapper
      onSwipeDelete={() => deleteGift()}
    >
    <Card>
      <CardItem header
        style={{
          backgroundColor: colors.$cardHeaderBg
        }}>
           <GiftCardInputTitle
            giftTitle={giftTitle}
            updateGiftTitle={updateGiftTitle}
          />
      </CardItem>
      <CardItem body>
        <GiftCardInputGiftDescription
          giftDesc={giftDesc}
          updateGiftDesc={updateGiftDesc}
         />
      </CardItem>
      { footerIsVisible &&
          <CardItem style={styles.footerCard}>
            <Button
              style={styles.button}
              disabled
              small
              textStyle={{
                color: 'white'
              }}>
              { friendName.toUpperCase() || '' }
            </Button>
          </CardItem>
      }
    </Card>
    </SwiperWrapper>

  )
}

const styles = StyleSheet.create({
  footerCard: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    backgroundColor: 'purple'
  }
})
GiftCard.PropTypes = {
  deleteGift: React.PropTypes.func,
  friendName: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  updateGiftTitle: React.PropTypes.func,
  updateGiftDesc: React.PropTypes.func
}
