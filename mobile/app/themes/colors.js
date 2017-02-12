import Color from 'color';
// return Color(this.deepblue).lighten(0.5).hexString(); },
export default {
  // old toolbar bg: F8F8F8
  white: '#fff',
  black: '#000',
  lightgrey2: '#dddddd', //header (TopBar), footer (BottomBar), tabs (AppContainer)
  lightgrey: '#d4d4d4',
  offwhite: '#ededed',
  darkgreen: '#5a8e0b',
  lightgreen: '#58b21c' ,
  coolblue: '#dccfec',
  soothingblue: '#b8c1dd',
  deepblue: '#0800ff',
  red: '#d62246',
  darkpurple: '#8c2b62',
  pink: '#dd85bd',
  get $friendHeadingColor () { return this.darkpurple },  // used in TopBar
  get $headerFooterTextColor () { return this.red },
  get $activeTabColor () { return this.darkpurple },
  get $activeTabBackground () { return this.lightgrey },
  get $cardHeaderBg() { return this.darkpurple },
  get $cardBg() { return this.white },
  get $defaultIconColor() { return Color(this.darkpurple).lighten(0.3).hexString()},
  get $headerFooterBg() { return this.offwhite },

}


