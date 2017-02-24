import React from 'react'
// import Modal from 'react-native-modalbox'
import Modal from './SimpleModal'
import { View, Dimensions, Text} from 'react-native'
import { Content } from 'native-base'
// gets width of entire display

export const ModalFormWrapper = ({ style, isVisible, handleClickAway, children }) => {
  const { height, width } = Dimensions.get('window')
  return (

    <Modal
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={() => undefined}
    closeOnTouchOutside={true}
      modalDidClose={() => handleClickAway()}

      position="top"
      open={true}
      animationType={'fade'}
      containerStyle={{
        justifyContent: 'center'
      }}
      modalStyle={{
        height: 100,
        borderRadius: 2,
        margin: 20,
        padding: 10,
        backgroundColor: 'red'
      }}>

        <Text>HEsssssssssssssssLLO</Text>

    </Modal>
  )
}
