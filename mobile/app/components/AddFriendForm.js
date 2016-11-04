import React from 'react';
import {
  StyleSheet
} from 'react-native';
//import Modal from 'react-mative-modalbox';
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
} from 'native-base'
import {
  Modal
} from 'react-native'
/* onRequestClose={() => addFriendToggleModalVisible()}  mandatory android prop*/
const AddFriendForm = ({
  visible,
  addFriendToggleModalVisible
}) => {
  console.log(addFriendToggleModalVisible, 'rerender');
  return (
      <Modal visible={visible} animationType={ "slide"} transparent={false}>
        <Container style={{ height: 50 }}>
       
            <Header>
              <Button transparent>
                      <Text></Text>
                    </Button>
              <Title>Add a new Friend</Title>
            </Header>
              <Content>
                <List>
                  <ListItem>
                      <InputGroup>
                          <Icon name='ios-person' />
                          <Input placeholder='EMAIL' />
                      </InputGroup>
                  </ListItem>
                </List>
              </Content>
            <Footer>
              <FooterTab>
                  <Button onPress={()=> addFriendToggleModalVisible() }>
                    <Icon 
                      name='ios-close'
                      style={{color: 'white'}} />
                  </Button>   
                <Button>Save Friend</Button>
              </FooterTab>
            </Footer>
        </Container>
      </Modal>


  )
}

export default AddFriendForm;