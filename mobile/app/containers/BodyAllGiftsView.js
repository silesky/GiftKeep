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
      isSelected: React.PropTypes.bool
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>Hello</Text>
            <Button transparent>
                <Icon name='ios-globe-outline' />
            </Button>
          </Content>
      </Container>
    );
  }
}
