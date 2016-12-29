import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import {
  Container,
  Content,
  Card,
  CardItem,
  Title,
  Text
} from 'native-base'
import * as Utils from './../utils/utils'
// should get an array of all the gifts
class BodyEventsView extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    isSelected: React.PropTypes.bool,
  }
  render() {
    console.log('props', this.props, '###');
    // I can use truthy or falsy, but I prefer to keep the logic explicit in case I want to add another tab
    return (
      <Container>
        <Content>
          {this.props.events.map( ({eventName, eventDate, eventId}, index) => {
            return (
              <Card key={index}>
                <CardItem header>
                  <Title>{eventName}</Title>
                </CardItem>
                
                <CardItem body>
                  <Text>{eventDate}</Text>
                </CardItem> 
              </Card>
            )
          })
          }

        </Content>
      </Container>
    );
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => {
  let { events } = Utils.getFriendByFriendId(state, state.visible.friendFormUpdatingSelectedFriendId);
  events = (events && events.length) ? events : [];
  console.log('HEY!', events);
  return {
    state: state,
    events: events
  }
};
export default connect(mstp, mdtp)(BodyEventsView)