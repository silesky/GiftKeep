import React, { PropTypes } from 'react'
import colors from './../themes/colors'
import { Input } from 'native-base'
export const GiftCardTitleInput = ({
  updateGiftTitle,
  giftTitle
}) => (
  <Input
    placeholderTextColor={colors.lightgrey}
    placeholder="Title"
    style={{
      color: 'white',
      fontWeight: '700'
    }}
  value={ giftTitle }
  onChangeText={(input) => {
    updateGiftTitle(input)
  }}/>)
