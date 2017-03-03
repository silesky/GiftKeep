import React from 'react'

import {
  Thumbnail
} from 'native-base'

const FbProfImage = ({ fbImage }) => (
  <Thumbnail
    source={{
      uri: fbImage,
      width: 25,
      height: 25,
      scale: 3
    }}
  />
)

export default FbProfImage
