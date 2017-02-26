import React from 'react'
import Modal from './SimpleModal'
import { colors } from './../themes';
export const SimpleModalFormWrapper = ({ style, isVisible, handleClickAway, children, height }) => {
  return (
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
        height: height,
        borderRadius: 2,
        margin: 20,
        padding: 5,
        backgroundColor: colors.$cardBg
      }}>
      { children }
    </Modal>
  )
}
