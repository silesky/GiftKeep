import React, { Component } from 'react'

import { LayoutAnimation } from 'react-native'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import * as actions from './../actions/'

import { Container, Content, Card, CardItem, Title, Text } from 'native-base'

import { EventCard, NoEventsAlert, NoFriendsAlert } from './../components/'

import * as Utils from './../utils/utils'

// should get an array of all the gifts
class BodyEventsView extends Component {
  static propTypes = {
    isSelected: React.PropTypes.bool,
  }

  onFriendEventDelete (eventId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.friendEventDelete(eventId)
  }
  render () {
    const { bday, hasEvents, hasFriends, friendName } = this.props

    return (
      <Container>
        <Content>
          {!hasFriends &&
            <NoFriendsAlert
              addFriendBtnClick={this.props.actions.friendFormVisibilityToggle}
              friendName={friendName}
              bday={bday}
            />}

          {hasFriends &&
            !hasEvents &&
            <NoEventsAlert
              addEventBtnClick={this.props.actions.createEventModalVisibilityTrue.bind(
                this,
                this.props.selectedFriendId
              )}
            />}

          {this.props.events.map(({ eventName, eventDate, eventId }, index) => {
            return (
              <EventCard
                onFriendEventUpdate={this.props.actions.friendEventUpdateFromEventsView.bind(
                  this,
                  eventId
                ) /* update everything */}
                onFriendEventDelete={() => this.onFriendEventDelete(eventId)}
                key={index}
                eventName={eventName}
                eventDateIso={eventDate}
              />
            )
          })}

        </Content>
      </Container>
    )
  }
}

const mdtp = dispatch => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = state => {
  let { bday, events, friendName } = Utils.getFriendByFriendId(
    state,
    state.visible.selectedFriendId
  )
  const { allFriendsVisibility } = state.visible
  let whichEvents
  if (allFriendsVisibility) {
    const allEvents = Utils.getAllEvents(state)
    whichEvents = allEvents
  } else {
    whichEvents = events && events.length ? events : []
  }
  return {
    events: whichEvents,
    bday,
    friendName,
    hasFriends: !!state.user.data.length,
    hasEvents: !!whichEvents.length,
  }
}
export default connect(mstp, mdtp)(BodyEventsView)
