import React from 'react'
import { Content, Card, Title, Button, CardItem, Icon } from 'native-base'
import { View, Modal } from 'react-native'
export class ModalDrawerCardWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isVisible: props.isVisible }
  }
  toggleVisible (bool) {
    this.setState({ isVisible: bool })
    this.props.onCancel()
  }
  render () {
    const { isVisible, iconName, title, onCancel, onSubmit } = this.props
    return (
      <Modal visible={isVisible} animationType={'fade'} transparent={true}>
        <Content>
          <Card
            style={{
              margin: 20,
              marginTop: 30,
              backgroundColor: 'white',
            }}
          >
            <View
              style={{
                padding: 15,
                paddingBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Icon name={iconName} />
              <Title
                style={{
                  paddingLeft: 10,
                }}
              >
                {title}
              </Title>
            </View>

            {this.props.children}

            <CardItem footer>
              <Button
                style={{
                  alignSelf: 'center',
                }}
                danger
                onPress={() => this.toggleVisible()}
              >
                CANCEL
              </Button>
              <Button
                style={{
                  alignSelf: 'center',
                }}
                success
                onPress={() => onSubmit()}
              >
                OK
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Modal>
    )
  }
}
