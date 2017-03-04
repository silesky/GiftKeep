import Color from 'color'
import colors from './colors'
import { Platform } from 'react-native'

export default {
    // List
  listBorderColor: '#ddd',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: (Platform.OS === 'ios') ? 12 : 16,
  listNoteColor: '#808080',
  listNoteSize: 13
}
