import React from 'react'
import { Input } from 'native-base'
export const GiftCardInputGiftDescription = ({
  updateGiftDesc,
  giftDesc,
  onGiftInputFocus,
  isSelected,
  selectedCardStyles,
  onGiftInputBlur,
}) => (
  <Input
    style={{
      marginRight: 25,
      marginLeft: 10,
      fontSize: 18,
      backgroundColor: selectedCardStyles.backgroundColor,
    }}
    height={isSelected ? 125 : 75}
    onFocus={() => onGiftInputFocus()}
    onBlur={() => onGiftInputBlur()}
    placeholder='description...'
    multiline={true}
    value={giftDesc}
    onChangeText={input => updateGiftDesc(input)}
  />
)
