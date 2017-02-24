import React from 'react'
import { Modal } from 'react-native'

export const ModalFormWrapper = ({ visible, children }) => {
  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      transparent={true}
    >
    { children }
  </Modal>)
}
