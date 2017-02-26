import React from 'react'
import { Input } from 'native-base'
export const GiftCardInputGiftDescription = ({
  updateGiftDesc,
  giftDesc
}) => (
        <Input
          placeholder="description..."
          multiline={true}
          value={giftDesc}
          onChangeText={ (input) => updateGiftDesc(input)}
        />
  )
