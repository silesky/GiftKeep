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
     const { friendFormIsUpdating  } = this.props.state.visible
  
    this.state = {
      nameInput: null, // use the state so I can clear it based on whether it's updating or not
      bdayInput: null,
    }
    this.nameInput;
  }
  componentWillUpdate() {
        const { friendFormIsUpdating  } = this.props.state.visible

        console.log(friendFormIsUpdating);
    this.nameInput = (friendFormIsUpdating) ? 'updating' : 'creating';


  }
  handleNameChange(input) {
    this.props.actions.friendFormNameInputUpdate(input);
    this.setState({ nameInput: input });
  }
  handleBdayChange(input) {
    this.props.actions.friendFormBdayInputUpdate(input);
    this.setState({ bdayInput: input })
  }

  render() {
    const { state } = this.props,
      {
        friendFormIsUpdating,
        friendFormUpdatingSelectedFriendId,
        friendFormIsVisible //id 
      } = state.visible
    const handleCreateUpdate = () => { // put this in render method because I don't want to destructure twice.
      return (friendFormIsUpdating)
        ? this.props.actions.updateFriend(friendFormUpdatingSelectedFriendId, this.state.nameInput, this.state.bdayInput)
        : this.props.actions.createFriend(this.state.nameInput, this.state.bdayInput)
    }
    const friendObj = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
console.log('FriendFormCreateUpdate.. rendered.')

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
                    value={this.nameInput}
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
              <Button onPress={() => handleCreateUpdate()}>
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

