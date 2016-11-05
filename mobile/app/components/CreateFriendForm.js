import React from 'react';
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

/* onRequestClose={() => createFriendToggleModalVisible()}  mandatory android prop*/
const CreateFriendForm = ({
  createFriendToggleModalVisible,
  createFriendModalVisibility,
  createFriend
}) => {
  let nameInput, bdayInput = '';
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
                            onChangeText={(input) => nameInput = input} 
                            placeholder='Name' />
                      </InputGroup>
                    </ListItem>
                        <ListItem>
                          <Icon name='md-calendar' />
                          <DatePicker 
                            showIcon={false}
                            onDateChange={(input) => bdayInput = input}
                            style={{width: 200}}
                            mode="date"
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
                            placeholder="Birthday"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel" />
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
                <Button onPress={() => createFriend(nameInput, bdayInput)}>Create</Button>
              </FooterTab>
            </Footer>
        </Container>
      </Modal>


  )
}

export default CreateFriendForm;