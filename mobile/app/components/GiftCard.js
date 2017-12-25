import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { colors } from './../themes/'
import { Button, Card, CardItem, Icon, Content } from 'native-base'
// import * as Util  from './../utils/utils';
import {
  GiftCardInputTitle,
  GiftCardInputGiftDescription,
  SwiperWrapper,
  GiftEventCardFooter,
} from './../components/'
export const GiftCard = ({
  deleteGift,
  friendId,
  friendName,
  giftDesc,
  giftTitle,
  isSelected,
  updateGiftDesc,
  updateGiftTitle,
  footerIsVisible,
  onGiftInputFocus,
  onGiftInputBlur,
}) => {
  // should take a name, birthday and text prop, along with being editable and so
  // forth
  const selectedCardStyles = isSelected
    ? { backgroundColor: colors.yellow }
    : { opacity: 0.5, backgroundColor: colors.paleyellow }

  return (
    <SwiperWrapper onSwipeDelete={() => deleteGift()}>
      <Content>
        <Card
          style={{
            ...selectedCardStyles,
          }}
        >
          <CardItem>

            <GiftCardInputGiftDescription
              selectedCardStyles={selectedCardStyles}
              isSelected={isSelected}
              onGiftInputFocus={onGiftInputFocus}
              onGiftInputBlur={onGiftInputBlur}
              giftDesc={giftDesc}
              updateGiftDesc={updateGiftDesc}
            />
          </CardItem>
          { footerIsVisible &&
          <GiftEventCardFooter
            friendName={friendName}
            isVisible={footerIsVisible}
          />
          }
        </Card>
      </Content>
    </SwiperWrapper>
  )
}

GiftCard.PropTypes = {
  deleteGift: PropTypes.func,
  friendName: PropTypes.string,
  isVisible: PropTypes.bool,
  updateGiftTitle: PropTypes.func,
  updateGiftDesc: PropTypes.func,
}
