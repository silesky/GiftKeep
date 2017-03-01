import React from 'react'
import { Dimensions, View } from 'react-native'
import Modal from './SimpleModal'
import { colors } from './../themes';
export const SimpleModalFormWrapper = ({ style, isVisible, handleClickAway, children, modalHeight }) => {
  const { height, width } = Dimensions.get('window') // gets width of entire display
  return (
    <View
    style={{
      position: 'absolute',
      height: height,
      width: width,
      zIndex: 999
    }}>
    <Modal
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={() => undefined}
      closeOnTouchOutside={true}
      modalDidClose={() => handleClickAway()}
      open={isVisible}
      containerStyle={{
        justifyContent: 'flex-start'
      }}
      modalStyle={{
        height: modalHeight,
        borderRadius: 2,
        margin: 20,
        padding: 5,
        backgroundColor: colors.$cardBg
      }}>
      { children }
    </Modal>
    </View>
  )
}
