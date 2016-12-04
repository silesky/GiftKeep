import React from 'react';
import { 
  Button,
  Icon,
  Container,
  Text
} from 'native-base'

export default class BodyAllGiftsView extends React.Component {
constructor() {
  super()
  }
  render() {
    return (
      <Container>
        <Text>Hello</Text>
        <Button transparent onPress={()=> this.props.allGiftsVisibilityToggle()}>
                    <Icon name='ios-globe-outline' />
            </Button>
      </Container>
    );
  }
}
