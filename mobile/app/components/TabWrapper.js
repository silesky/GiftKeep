import React from 'react'
import { colors } from './../themes/'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
export const TabWrapper = ({ children, handleChangeTab }) => (
  <ScrollableTabView
    contentProps={{
      style: { paddingBottom: 0 }
    }}
    locked={true}
    renderTabBar={() =>
      <DefaultTabBar style={{
        borderTopWidth: 1,
        height: 45,
        paddingTop: 5,
        paddingBottom: 0
      }} />}
    tabBarUnderlineStyle={{ backgroundColor: colors.$activeTabUnderlineColor }}
    tabBarInactiveTextColor={ colors.$inactiveTabTextColor }
    tabBarActiveTextColor={ colors.$activeTabTextColor }
    tabBarBackgroundColor={ colors.$activeTabBackground }
    initialPage={0}
    //  currentPage={this.props.state.selectedTab} broken unforuntately
    onChangeTab={(selectTabEvent) => handleChangeTab(selectTabEvent['i'])}
  >
    {children}
  </ScrollableTabView>
)
