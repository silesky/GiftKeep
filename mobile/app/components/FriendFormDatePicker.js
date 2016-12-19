import DatePicker from 'react-native-datepicker';
import React from 'react';
import { View } from 'react-native';
import { Icon, ListItem} from 'native-base';

export const FriendFormDatePicker = ({date, placeholder, onDateChange}) => {
console.log('...........', date, placeholder, onDateChange)
return (
      <DatePicker
      showIcon={false}
      onDateChange={(input) => onDateChange(input)}
      style={{ width: 200 }}
      mode="date"
      date={date}
      format="MM-DD"
      placeholder={placeholder}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateInput: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: 10, /* double name */
          paddingRight: 5, /* does nothing, same as name */
          borderWidth: null,
        }

      }}

      />
      )
}