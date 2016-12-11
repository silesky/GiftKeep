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
    this.state = {
      nameInput: null,
      bdayInput: null,
    }
    const { state } = this.props;
    
  }
  handleNameChange(input) {
    this.props.actions.friendFormNameInputUpdate(input);
    this.setState({ nameInput: input });
  }
  handleBdayChange(input) {
    this.props.actions.friendFormBdayInputUpdate(input);
    this.setState({ bdayInput: input })
  }
  handleSubmit() {
    const { state } = this.props,
     {  friendFormIsUpdating,
        friendFormUpdatingSelectedFriendId
    }  = state.visible
    return (friendFormIsUpdating) 
          ? this.props.actions.updateFriend(friendFormUpdatingSelectedFriendId, this.state.nameInput, this.state.bdayInput)
          : this.props.actions.createFriend(this.state.nameInput, this.state.bdayInput) 
  }

  render() {
    const { state } = this.props;
    const { 
      friendFormIsUpdating,
      friendFormUpdatingSelectedFriendId,
      friendFormIsVisible //id 
    }  = state.visible
    
    const getFriend = () => {
      let val = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
      return val;
    }
    const friendObj = getFriend();
    
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
            <Title>{(friendFormIsUpdating) ? `Update ${friendObj.friendName}` : `Create Friend`}
            </Title>
          </Header>
          <Content>
            <List>
              <ListItem>
                <InputGroup>
                  <Icon name='ios-person' />
                  <Input
                    value={this.state.nameInput}
                    onChangeText={(input) => this.handleNameChange(input.trim())}
                    placeholder={friendObj ? friendObj.friendName : 'Please Enter a Name'}
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
                  placeholder={friendObj ? friendObj.bday : 'Please enter a Birthday'}
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
              <Button onPress={() => this.handleSubmit()}>
            { (friendFormIsUpdating) ? 'UPDATE' : 'CREATE' }
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
// no more store.dispatch(actions.createFriend())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(FriendFormCreateUpdate)

