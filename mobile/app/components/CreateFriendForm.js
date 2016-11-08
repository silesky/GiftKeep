import React, {Component} from 'react';
import {
  StyleSheet,
  Modal
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Input,
  InputGroup,
  List,
  ListItem,
  Text,
  Button,
  Title,
  Icon,
} from 'native-base';
import DatePicker from 'react-native-datepicker';

export default class CreateFriendForm extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: null,
      bdayInput: null,
    }
    // need to use this.state in order for the bdayInput to know to rerender once a date is picked. 
    // Redux is a bit overkill just to handle temporary form data.
    this.setName = (input) => this.setState({nameInput: input});
    this.setBday = (input) => this.setState({bdayInput: input});
  }

  render() {
    const { 
      createFriendToggleModalVisible,
      createFriendModalVisibility,
      createFriend } = this.props;
  return (
      <Modal 
        visible={createFriendModalVisibility} 
        animationType={'slide'} 
        transparent={false}
        >
        <Container style={{ height: 50 }}>
            <Header>
              <Button transparent>
                      <Text></Text>
                    </Button>
              <Title>Create New Friend</Title>
            </Header>
              <Content>
                <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name='ios-person' />
                          <Input 
                            onChangeText={(input) => this.setName(input.trim())} 
                            placeholder='Name' 
                            placeholderTextColor='#c9c9c9'/>
                      </InputGroup>
                    </ListItem>
                        <ListItem>
                          <Icon name='md-calendar' />
                          <DatePicker 
                            showIcon={false}
                            onDateChange={(input) => this.setBday(input)}
                            style={{width: 200}}
                            mode="date"
                            date={this.state.bdayInput}
                            format="MM-DD"
                            placeholder="Birthday"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateInput: {
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  paddingLeft: 10, /* double name */
                                  paddingRight: 5, /* does nothing, same as name */
                                  borderWidth: null,
                                }
                           
                            }}
                
                        />
                         </ListItem>
                </List>
                
              </Content>
            <Footer>
              <FooterTab>
                  <Button onPress={() => createFriendToggleModalVisible()}>
                    <Icon 
                      name='ios-close'
                      style={{color: 'white'}} />
                  </Button>   
                <Button onPress={() => {
                  createFriend(this.state.nameInput, this.state.bdayInput);
                  console.log('bday input created.', this.state.bdayInput);
                }}>Create</Button>
              </FooterTab>
            </Footer>
        </Container>
      </Modal>
    );
  }
}

/* onRequestClose={() => createFriendToggleModalVisible()}  mandatory android prop*/

