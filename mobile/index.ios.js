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





const ControlPanelStyles = StyleSheet.create({

    })
    // const DrawerStyles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     padding: 20,
    //     backgroundColor: 'black',
    //   },
    //   controlText: {
    //     color: 'white',
    //   },
    //   button: {
    //     backgroundColor: 'white',
    //     borderWidth: 1,
    //     borderColor: 'black',
    //     padding: 10,
    //   }
    // })

// export class ControlPanel extends Component {

//   render() {
//     let {closeDrawer} = this.props
//     return (
//       <ScrollView style={ControlPanelStyles.container}>
//         <Text style={ControlPanelStyles.controlText}>Control Panel</Text>
//         <TouchableOpacity style={ControlPanelStyles.button} onPress={closeDrawer}>
//           <Text>Close Drawer</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     )
//   }
// }

// const ControlPanelStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'black',
//   },
//   controlText: {
//     color: 'white',
//   },
//   button: {
//     backgroundColor: 'yellow',
//     borderWidth: 1,
//     borderColor: 'red',
//     padding: 10,
//   }
// })

// class Application extends Component {  
//   closeControlPanel = () => {
//     this._drawer.close()
//   };
//   openControlPanel = () => {
//     this._drawer.open()
//   };
//   render () {
//     return (
//       <Drawer
//         ref={(ref) => this._drawer = ref}
//         content={<ControlPanel />}
//         >

//       </Drawer>
//     )
//   }
// }

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

export class ControlPanel extends Component {

    render() {
      return (
        <Container>
             <Header>
                    <Button onPress={() => this.props.closeDrawer()} transparent>
                          <Icon name='ios-menu' />
                    </Button>
                    <Title>Header</Title>
                </Header>
 
        </Container>
        );
    }
}

class AppContainer extends Component {

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<ControlPanel closeDrawer={() => this._drawer.close()}
                type="static"
              />
            }>
              <Container> 
                <Header>
                    <Button onPress={() => this._drawer.open()} transparent>
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