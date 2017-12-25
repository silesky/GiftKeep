import React from 'react'
import PropTypes from 'prop-types'
import { SwiperWrapper, GiftEventCardFooter } from '../components/'
import { Card, CardItem, Icon, Text } from 'native-base'
// import * as Util  from './../utils/utils';
import Moment from 'moment'
import 'moment-duration-format'

export const EventCard = ({
  onSelectEventsView,
  onFriendEventUpdate,
  onFriendEventDelete,
  eventName,
  eventDateIso,
  friendName,
  footerIsVisible,
}) => {
  const _isEventInTheFuture = Moment(eventDateIso).format('YYYYMMDD') > Moment().format('YYYYMMDD')
  const _howManySecondsTill = Moment(eventDateIso).diff(Moment(), 'seconds')
  const timeDisplayString = _isEventInTheFuture
    ? Moment.duration(_howManySecondsTill, 'seconds').format(
      'M [months], D [days], h [hours], m [minutes]'
    )
    : `${Moment(eventDateIso).format('dddd, MMMM Do, YYYY')} has passed.`

  return (
    <SwiperWrapper
      onSwipeUpdate={() => onFriendEventUpdate()}
      onSwipeDelete={() => onFriendEventDelete()}
    >
      <Card>
        <CardItem
          style={{ height: 120, marginTop: 10, justifyContent: 'center' }}
        >
          <Icon
            style={{ fontSize: 40, marginLeft: 5, marginRight: 10 }}
            name='md-calendar'
          />
          <Text style={{ fontSize: 24, lineHeight: 24, marginTop: 5 }}>
            {eventName && eventName.trim()}
          </Text>
          <Text style={{ fontSize: 20 }} note>{timeDisplayString}</Text>
        </CardItem>
        { footerIsVisible &&
        <GiftEventCardFooter
          friendName={friendName}
        />
        }
      </Card>
    </SwiperWrapper>
  )
}

EventCard.PropTypes = {
  onSelectEventsView: PropTypes.func,
  onFriendEventDelete: PropTypes.func,
  onFriendEventUpdate: PropTypes.func,
  eventDateIso: PropTypes.string,
  onSwipeDelete: PropTypes.string,
  eventName: PropTypes.bool,
}
