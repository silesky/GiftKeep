import React from 'react'
import Modal from 'react-native-modalbox';

export const ModalFormWrapper = ({ visible, children }) => {
  return (
    <Modal
      style={{height: 500, width: 300 }}
      isOpen={true}
      animationType={'slide'}
      transparent={true}
    >
    { children }
  </Modal>)
}
