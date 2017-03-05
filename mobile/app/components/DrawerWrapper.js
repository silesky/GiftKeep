import React from 'react'
import { default as RnDrawer } from 'react-native-drawer'
export const DrawerWrapper = ({ children, content, handleCloseDrawer, isDrawerOpen }) => {
  // cont
  return (
    <RnDrawer
        onClose={() => handleCloseDrawer()}
        tapToClose={true}
        openDrawerOffset={0.3 /* % gap on right side of drawer */}
        panCloseMask={0.3 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
        open={isDrawerOpen}
        tweenDuration={70 /* speed */}
        tweenHandler={(ratio) => { /* transparency effects */
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2
            }
          }
        } }
        negotiatePan
        content={content}
    >
    {children}
   </RnDrawer>
  )
}
