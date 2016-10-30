import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView
  /*  ScrollView,
    TouchableOpacity,
    PropTypes*/
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

import { lipsum } from './util';

import Drawer from 'react-native-drawer';


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
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                ref={(ref) => this._drawer = ref}
                type='static'
                content={  
                    <View>
                        <Text>{lipsum}</Text>
                     </View>}
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