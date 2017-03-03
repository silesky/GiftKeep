import React from 'react'
import { colors } from './../themes/'
import { Input } from 'native-base'
export const GiftCardInputTitle = ({ updateGiftTitle, giftTitle }) => (
  <Input
    placeholderTextColor={colors.lightgrey}
    placeholder="Title"
    style={{
      color: 'white',
      fontWeight: '700'
    }}
    value={giftTitle}
    onChangeText={(input) => {
      updateGiftTitle(input)
    }}
/>
)
