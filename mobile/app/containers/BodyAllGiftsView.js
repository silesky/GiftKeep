import React from 'react';
import { 
  Button,
  Icon,
  Container,
  Content,
  Text
} from 'native-base'

export default class BodyAllGiftsView extends React.Component {
  static propTypes = {
      allGiftsVisibilityToggle: React.PropTypes.func
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>Hello</Text>
            <Button transparent onPress={()=> this.props.allGiftsVisibilityToggle()}>
                <Icon name='ios-globe-outline' />
            </Button>
          </Content>
      </Container>
    );
  }
}
