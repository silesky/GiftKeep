import React from 'react'
import { Input } from  './../sporks/native-base'
export const GiftCardInputGiftDescription = ({
  updateGiftDesc,
  giftDesc,
  onGiftInputSelect,
  isSelected,
}) => (
        <Input
          height={isSelected ? 100 : 50}
          onFocus={() => onGiftInputSelect()}
          placeholder="description..."
          multiline={true}
          value={giftDesc}
          onChangeText={ (input) => updateGiftDesc(input)}
        />
  )
