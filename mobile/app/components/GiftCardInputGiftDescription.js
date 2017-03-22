import React from 'react'
import { Input } from  './../sporks/native-base'
export const GiftCardInputGiftDescription = ({
  updateGiftDesc,
  giftDesc,
  onGiftInputFocus,
  isSelected,
}) => (
        <Input
          height={isSelected ? 100 : 50}
          onFocus={() => onGiftInputFocus()}
          placeholder="description..."
          multiline={true}
          value={giftDesc}
          onChangeText={ (input) => updateGiftDesc(input)}
        />
  )
