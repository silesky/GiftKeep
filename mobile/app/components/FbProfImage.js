import React from 'react'

import { Thumbnail } from 'native-base'

const FbProfImage = ({ fbId }) => {
  return (
    <Thumbnail
      source={{
        uri:
          'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
        width: 25,
        height: 25,
        scale: 3,
      }}
    />
  )
}
export default FbProfImage
