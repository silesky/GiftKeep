import React, { Component } from 'react';
import { 
    AppRegistry, PropTypes
} from 'react-native';
import {
    Container,
    Card,
    CardItem,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon,
    Text
} from 'native-base';
import Drawer from 'react-native-drawer';
import { lipsum } from './util';



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

class AppContainer extends Component {
    render() {
        return (
            <Drawer
                tapToClose={true}
                openDrawerOffset={0.6 /* % gap on right side of drawer */}
                panCloseMask={0.6 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true} */}
                closedDrawerOffset={-3}
                ref={(ref) => this._drawer = ref}
                type='static'
                content={  
                    <Container>
                    <Header>
                        <Title>Friends</Title>
                        </Header>
                    <Content>

                            <Text>{lipsum}</Text>
                        </Content>
                     </Container>}
                >
                <Container> 
                    <Header>
                        <Button 
                        onPress={() => this._drawer.open()} 
                        transparent>
                            <Icon name='ios-menu' />
                        </Button>
                        <Title>Header</Title>
                    </Header>
                    <Content>
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
                </Container>
            </Drawer>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);