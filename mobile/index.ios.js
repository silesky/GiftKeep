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
                    <Text>Hello World</Text>
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