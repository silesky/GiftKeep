import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    Text
} from 'native-base';

const lipsum = 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'

import { Card, CardItem } from 'native-base';
export class CardExample extends Component {
    render() {
        return (
            <Container>
                  <Content>
                    <Card>
                          <CardItem header>                        
                            <Text>Card Header</Text>
                          </CardItem> 
                          <CardItem>                    
                            <Text>{lipsum}</Text>
                          </CardItem>
                    </Card>
                    </Content>
          </Container>
        );
    }
}
export default class AppContainer extends Component {
    render() {
        return (
              <Container> 
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>Header</Title>
                         <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>

                <Content>
                   <Text>CONTENT:</Text>
                    <CardExample />
                    <CardExample />
                    <CardExample />


                </Content>
                <Footer>
                    <FooterTab>
                        <Button transparent>
                            <Icon name='ios-call' />
                              <Text>Footer HERE</Text>
                        </Button>  
                    </FooterTab>
                </Footer>
            </Container>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);