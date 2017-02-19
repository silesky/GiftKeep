import React from 'react'
import { colors } from './../themes/'
import ScrollableTabView from 'react-native-scrollable-tab-view'
export const TabWrapper = ({ children, handleChangeTab }) => (
  <ScrollableTabView
    tabBarUnderlineStyle={{backgroundColor: colors.$activeTabTextColor }}
    tabBarInactiveTextColor={colors.$inactiveTabTextColor}
    tabBarActiveTextColor={colors.$activeTabTextColor}
    tabBarBackgroundColor={colors.$activeTabBackground}
    initialPage={0}
    //  currentPage={this.props.state.selectedTab} broken unforuntately
    onChangeTab={(selectTabEvent) => handleChangeTab(selectTabEvent['i'])}
  >
    {children}
  </ScrollableTabView>
)
