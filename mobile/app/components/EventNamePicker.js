import React from 'react'

import { Picker, View } from 'react-native'
import UUID from 'uuid-js'
export class EventNamePicker extends React.Component {
  static defaultProps = {
    pickerStyle: {},
    onEventNamePick: null,
    selectedValue: null,
    labelArr: [ 'Anniversary', 'Birthday', 'Christmas', 'Chanukah' ],
  }
  render () {
    const {
      pickerStyle,
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
        style={pickerStyle}
        selectedValue={selectedValue}
        onValueChange={(eventNameStr) => onEventNamePick(eventNameStr)}
        >
        {labels}
      </Picker>
    )
  }
}
