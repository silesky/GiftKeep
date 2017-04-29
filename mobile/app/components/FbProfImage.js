import React from 'react'

import { Thumbnail } from 'native-base'



const FbProfImage = ({ fbId }) => {
  return (
  <Thumbnail
    source={{
      uri: `https://graph.facebook.com/${fbId}/picture`,
      width: 25,
      height: 25,
      scale: 3,
    }}
  />
)
}
export default FbProfImage
