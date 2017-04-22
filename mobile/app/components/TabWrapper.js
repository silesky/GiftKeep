import React from 'react'
import { colors } from './../themes/'
import ScrollableTabView, { DefaultTabBar } from './../sporks/react-native-scrollable-tab-view'
export const TabWrapper = ({ children, handleChangeTab }) => (
  <ScrollableTabView
    contentProps={{
      style: { paddingBottom: 0 }
    }}
    locked={true}
    renderTabBar={() =>
      <DefaultTabBar
     textStyle={{fontSize: 18}}
      style={{
        borderTopWidth: 1,
        height: 60,
      }}
      underlineStyle={{height: 100}}
      tabStyle={{padding: 0 /* spacing between underline and bar */}}
       />}
    tabBarUnderlineStyle={{ backgroundColor: colors.$tabUnderlineColorActive, height: 5}}
    tabBarActiveTextColor={ colors.$tabTextColorActive }
    tabBarBackgroundColor={ colors.$tabBgActive }
    initialPage={0}
    //  currentPage={this.props.state.selectedTab} broken unforuntately
    onChangeTab={(selectTabEvent) => handleChangeTab(selectTabEvent['i'])}
  >
    {children}
  </ScrollableTabView>
)
