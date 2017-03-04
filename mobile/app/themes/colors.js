import Color from 'color'
// return Color(this.deepblue).lighten(0.5); },

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
  electricBlue: '#0892d0',
  red: '#d62246',
  darkpurple: '#8c2b62',
  pink: '#dd85bd',

  get $shadowBorder () { return '#ddd' },
  get $bigHeadingTextColor () { return Color(this.darkgrey).darken(0.3).hex() },  // used in TopBar
  get $headerFooterTextColor () { return this.red },
  // tabs
  get _tabColor () { return this.electricBlue },
  get $activeTabBackground () { return this.lightgrey },
  get $activeTabTextColor () { return this._tabColor },
  get $activeTabUnderlineColor () { return this._tabColor },
  get $cardHeaderBg () { return this.darkpurple },
  get $cardBg () { return this.white },
  get $defaultIconColor () { return Color(this.darkpurple).lighten(0.3).hex() },
  get $headerFooterBg () { return this.offwhite }
}
