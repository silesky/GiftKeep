import Color from 'color'
// return Color(this.deepblue).lighten(0.5).hexString(); },

module.exports = {
  // old toolbar bg: F8F8F8
  white: '#fff',
  black: '#000',
  lightgrey: '#dddddd', // header (TopBar), footer (BottomBar), tabs (AppContainer)
  darkgrey: '#878484',
  offwhite: '#ededed',
  darkgreen: '#5a8e0b',
  lightgreen: '#58b21c',
  coolblue: '#dccfec',
  soothingblue: '#b8c1dd',
  deepblue: '#0800ff',
  red: '#d62246',
  darkpurple: '#8c2b62',
  pink: '#dd85bd',

  get $shadowBorder () { '#ddd' },
  get $bigHeadingTextColor () { return Color(this.darkgrey).darken(0.3).hexString() },  // used in TopBar
  get $headerFooterTextColor () { return this.red },
  // tabs
  get $inactiveTabTextColor () { return Color(this.darkgrey).darken(0.2).hexString() },
  get $activeTabBackground () { return this.lightgrey },
  get $activeTabTextColor () { return this.darkpurple },
  get $activeTabUnderlineColor () { return this.darkpurple },
  get $cardHeaderBg () { return this.darkpurple },
  get $cardBg () { return this.white },
  get $defaultIconColor () { return Color(this.darkpurple).lighten(0.3).hexString() },
  get $headerFooterBg () { return this.offwhite }
}
