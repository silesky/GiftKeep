import React from 'react';
import myThemeLight from './../themes/myThemeLight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import Moment from 'moment';
import {
  Container,
  Content,
  Card,
  CardItem,
  Title,
  Text
} from 'native-base'
import { EventCard } from './../components/'
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
    const isEventInTheFuture = (date) => Moment(date).format('YYYYMMDD') > Moment().format('YYYYMMDD');
    return (
      <Container>
        <Content>
          { this.props.events.map(({eventName, eventDate, eventId}, index) => {
            const eventTimeFromNow = Moment(eventDate).fromNow();
            return (
              <EventCard 
              key={index} 
              eventName={eventName}
              eventTime={isEventInTheFuture(eventDate)
                      ? eventTimeFromNow
                      : 'Event has passed.'
                  }
              />
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
  let { events } = Utils.getFriendByFriendId(state, state.visible.selectedFriendId);
  events = (events && events.length) ? events : [];
  return {
    events: events
  }
};
export default connect(mstp, mdtp)(BodyEventsView)