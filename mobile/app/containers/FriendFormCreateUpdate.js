import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { FriendFormDatePicker } from './../components/FriendFormDatePicker.js';
import * as actions from './../actions/'
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
    this.state = { eventTitleInput: null } // adding state bc of some bug in date-picker where input won't show up
  }
  handleBdayChange(input) {
    this.props.actions.friendFormBdayInputUpdate(input);
    this.setState({ eventTitleInput: input })
  }
  render() {
    const {
        friendFormIsVisible,
        friendFormUpdatingSelectedFriendId,
        friendFormNameInput,
        friendFormBdayInput,
        friendName,
        bday,
        isUpdating, //id 
        actions,
        events
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
                    onChangeText={(input) => actions.friendFormNameInputUpdate(input)}
                    placeholder={isUpdating ? friendName : 'Please Enter a Name'}
                    placeholderTextColor='#c9c9c9' />
                </InputGroup>
              </ListItem>
           { events.map((eachEvent) => {
              return (
                  <ListItem key={eachEvent.eventId}>
                    <Icon name='md-calendar' />
                    <FriendFormDatePicker
                      placeholder={isUpdating ? bday : 'Add a special date.'}
                      onDateChange={(input) => this.handleBdayChange(input)}
                      date={this.state.eventTitleInput}
                    />
                    <Button>
                    {/* onPress={friendFormAddCateogry*/}
                    Category <Icon name='ios-add-circle' />
                    </Button>
                  </ListItem>
              )
            })
          }
            </List>
          </Content>
          <Footer>
            <FooterTab>
               <Button onPress={() => actions.friendFormCancelUpdateOrCreate()}>
                 CANCEL
                <Icon name='ios-close-circle-outline'/>
              </Button>
              <Button onPress={() => {
                //friendFormUpdatingSelectFriendId, eventTitleInput, eventDate,
                  actions.friendFormAddEvent(friendFormUpdatingSelectedFriendId, "eventTitleInput" , "eventDate" );
              }}>
                ADD NEXT EVENT
                <Icon name='ios-calendar-outline' />
              </Button>
              <Button onPress={() => {
                return (isUpdating)
                      ? actions.updateFriend(friendFormUpdatingSelectedFriendId, friendFormNameInput, friendFormBdayInput)
                      : actions.createFriend(friendFormNameInput, friendFormBdayInput)
                    }}>
                {(isUpdating) ? 'UPDATE' : 'CREATE'} {/* Button Title */}
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
    
    const friendObj = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
    const { bday, friendName, events } = friendObj
    console.log(events);
  return {
      isUpdating: !!(friendFormIsUpdating && friendFormUpdatingSelectedFriendId),
      bday,
      events,
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

