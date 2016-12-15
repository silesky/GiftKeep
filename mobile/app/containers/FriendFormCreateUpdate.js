import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { FriendFormDatePicker } from './../components/FriendFormDatePicker.js';
import * as actions from './../actions/actions'
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



import * as Utils from './../utils/utils'


class FriendFormCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bdayInput: null,
    }
  }
  handleNameChange(input) {
    this.props.actions.friendFormNameInputUpdate(input);
  }
  handleBdayChange(input) {
    this.props.actions.friendFormBdayInputUpdate(input);
    this.setState({ bdayInput: input })
  }
  handleCreateUpdate() { 
    const { 
      isUpdating,
      friendFormNameInput,
      friendFormBdayInput,
      friendFormUpdatingSelectedFriendId 
    } = this.props;
    return (isUpdating)
      ? this.props.actions.updateFriend(friendFormUpdatingSelectedFriendId, friendFormNameInput, friendFormBdayInput)
      : this.props.actions.createFriend(friendFormNameInput, friendFormBdayInput)
  }
  render() {
    const {
        friendFormIsVisible,
        friendName,
        bday,
        isUpdating, //id 
      } = this.props

    return (
      <Modal
        visible={friendFormIsVisible}
        animationType={'slide'}
        transparent={false}
        >
        <Container style={{ height: 50 }}>
          <Header>
            <Button transparent>
              <Text></Text>
            </Button>
            <Title>{isUpdating ? `Update ${friendName}` : `Create Friend`}
            </Title>
          </Header>
          <Content>
            <List>
              <ListItem>
                <InputGroup>
                  <Icon name='ios-person' />
                  <Input
                    defaultValue={isUpdating ? friendName : ''}
                    onChangeText={(input) => this.handleNameChange(input)}
                    placeholder={isUpdating ? friendName : 'Please Enter a Name'}
                    placeholderTextColor='#c9c9c9' />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Icon name='md-calendar' />
                <FriendFormDatePicker
                  placeholder={isUpdating ? bday : 'Add a special date.'}
                  onDateChange={(input) => this.handleBdayChange(input)}
                  date={this.state.bdayInput}
                 />
                 <Button>
                 {/* onPress={friendFormAddCateogry*/}
                Category <Icon name='ios-add-circle' />
                 </Button>
              </ListItem>
            </List>
          </Content>
          <Footer>
            <FooterTab>
               <Button onPress={() => this.props.actions.friendFormCancelUpdateOrCreate()}>
                 CANCEL
                <Icon name='ios-close-circle-outline'/>
              </Button>
              <Button onPress={() => console.log('next event clicked!')}>
                ADD NEXT EVENT
                <Icon name='ios-calendar-outline' />
              </Button>
              <Button onPress={() => this.handleCreateUpdate()}>
                {(isUpdating) ? 'UPDATE' : 'CREATE'}
                <Icon name='ios-checkbox-outline' />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Modal>
    );
  }
}

/* onRequestClose={() => friendFormVisibilityToggle()}  mandatory android prop*/

const mstp = (state) => {
   const { 
      friendFormIsUpdating, 
      friendFormIsVisible,
      friendFormNameInput,
      friendFormBdayInput,
      friendFormUpdatingSelectedFriendId 
    } = state.visible;
    const { bday, friendName } = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
  return {
      isUpdating: !!(friendFormIsUpdating && friendFormUpdatingSelectedFriendId),
      bday,
      friendName,
      friendFormIsVisible,
      friendFormNameInput,
      friendFormBdayInput,
      friendFormUpdatingSelectedFriendId
   }
  };
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(FriendFormCreateUpdate)

