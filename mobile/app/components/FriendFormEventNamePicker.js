import React from 'react'

import { Picker, View } from 'react-native'
import UUID from 'uuid-js'
export class FriendFormEventNamePicker extends React.Component {
  render () {
    const {
      onEventNamePick,
      selectedValue,
      labelArr,
    } = this.props
    const labels = labelArr.map(eachLabel =>
    <Picker.Item
      key={UUID.create().toString()}
      label={eachLabel}
      value={eachLabel}/>)
    return (
      <Picker
        selectedValue={selectedValue}
        onValueChange={(eventNameStr) => onEventNamePick(eventNameStr)}
      >
        {labels}
      </Picker>
    )
  }
}
