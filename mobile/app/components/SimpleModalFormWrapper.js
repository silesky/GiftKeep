import React from 'react'
import { Dimensions, View } from 'react-native'
import SimpleModal from './SimpleModal'
import { colors } from './../themes'

export const SimpleModalFormWrapper = ({
  style,
  isVisible,
  handleClickAway,
  children,
  modalHeight,
}) => {
  const { height, width } = Dimensions.get('window') // gets width of entire display
  return (
    <View
      style={{
        position: 'absolute',
        height: height,
        width: width,
        zIndex: 999,
      }}
    >
      <SimpleModal
        modalStyle={{
          borderRadius: 2,
          margin: 15,
          padding: 5,
          backgroundColor: colors.$cardBg,
        }}
        offset={0}
        overlayBackground={'rgba(0, 0, 0, 0.75)'}
        animationDuration={200}
        animationTension={40}
        modalDidOpen={() => undefined}
        closeOnTouchOutside={true}
        modalDidClose={() => handleClickAway()}
        open={isVisible}
        containerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        {children}
      </SimpleModal>
    </View>
  )
}
