import React from 'react'
import { Input } from  './../sporks/native-base'
export const GiftCardInputGiftDescription = ({
  updateGiftDesc,
  giftDesc,
  onGiftInputFocus,
  isSelected,
}) => (
        <Input
          style={{marginRight: 25, marginLeft: 10, fontSize: 18 }}
          height={isSelected ? 125 : 75}
          onFocus={() => onGiftInputFocus()}
          placeholder="description..."
          multiline={true}
          value={giftDesc}
          onChangeText={ (input) => updateGiftDesc(input)}
        />
  )
