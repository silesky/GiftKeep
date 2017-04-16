import React from 'react'

import { Picker, View } from 'react-native'
import UUID from 'uuid-js'
export class FriendFormEventNamePicker extends React.Component {
  constructor() {
    super()
    this.state = { pickerVal: null}
  }
  onPickerChange(val) {this.setState({pickerVal: val})
  }
  render () {
    const { onEventNamePick, labelArr } = this.props
    const labels = labelArr.map(eachLabel =>
    <Picker.Item
      key={UUID.create().toString()}
      label={eachLabel}
      value={eachLabel}/>)
    return (
      <Picker
      selectedValue={this.state.pickerVal}
      onValueChange={(val) => onEventNamePick(val)}>
        {labels}
      </Picker>
    )
  }
}
