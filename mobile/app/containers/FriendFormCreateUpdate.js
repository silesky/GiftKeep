import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
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


import DatePicker from 'react-native-datepicker';
import * as Utils from './../utils/utils'


class FriendFormCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.selectedFriend; //delete
    this.state = {
      bdayInput: null,
    }
  }
  componentWillUpdate() {
    this.selectedFriend = this.props.state.visible.friendFormUpdatingSelectedFriendId; //delete
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
      friendFormIsUpdating, 
      friendFormNameInput,
      friendFormBdayInput,
      friendFormUpdatingSelectedFriendId 
    } = this.props.state.visible;
    return (friendFormIsUpdating)
      ? this.props.actions.updateFriend(friendFormUpdatingSelectedFriendId, friendFormNameInput, friendFormBdayInput)
      : this.props.actions.createFriend(friendFormNameInput, friendFormBdayInput)
  }
  render() {
    const { state } = this.props,
      {
        friendFormIsUpdating,
        friendFormUpdatingSelectedFriendId,
        friendFormIsVisible //id 
      } = state.visible

    const friendObj = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
    console.log('FriendFormCreateUpdate.. rendered.')
    const isUpdating = friendFormIsUpdating && friendObj
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
            <Title>{isUpdating ? `Update ${friendObj.friendName}` : `Create Friend`}
            </Title>
          </Header>
          <Content>
            <List>
              <ListItem>
                <InputGroup>
                  <Icon name='ios-person' />
                  <Input
                    defaultValue={isUpdating ? friendObj.friendName : ''}
                    onChangeText={(input) => this.handleNameChange(input)}
                    placeholder={isUpdating ? friendObj.friendName : 'Please Enter a Name'}
                    placeholderTextColor='#c9c9c9' />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Icon name='md-calendar' />
                <DatePicker
                  showIcon={false}
                  onDateChange={(input) => this.handleBdayChange(input)}
                  style={{ width: 200 }}
                  mode="date"
                  date={this.state.bdayInput}
                  format="MM-DD"
                  placeholder={isUpdating ? friendObj.bday : 'Please enter a Birthday'}
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
              <Button onPress={() => this.props.actions.friendFormCancelUpdateOrCreate()}>
                <Icon
                  name='ios-close'
                  style={{ color: 'white' }} />
              </Button>
              <Button onPress={() => this.handleCreateUpdate()}>
                {(friendFormIsUpdating) ? 'UPDATE' : 'CREATE'}
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Modal>
    );
  }
}

/* onRequestClose={() => friendFormVisibilityToggle()}  mandatory android prop*/

const mstp = (state) => ({ state });
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(FriendFormCreateUpdate)

