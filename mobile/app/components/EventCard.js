import React, { PropTypes, } from 'react'
import { SwiperWrapper, } from '../components/'
import {
  Card,
  CardItem,
  Icon,
  Text,
} from './../sporks/native-base'
// import * as Util  from './../utils/utils';
import Moment from 'moment'
import 'moment-duration-format'

export const EventCard = ({
  onSelectEventsView,
  onFriendEventUpdate,
  onFriendEventDelete,
  eventName,
  eventDateIso,
}) => {
  const _isEventInTheFuture = Moment(eventDateIso).format('YYYYMMDD') > Moment().format('YYYYMMDD')
  const _howManySecondsTill = Moment(eventDateIso).diff(Moment(), 'seconds')
  const timeDisplayString = _isEventInTheFuture
    ? Moment.duration(_howManySecondsTill, 'seconds').format('M [months], D [days], h [hours], m [minutes]')
    : `${Moment(eventDateIso).format('dddd, MMMM Do, YYYY')} has passed.`

  return (
     <SwiperWrapper
        onSwipeUpdate={() => onFriendEventUpdate()}
        onSwipeDelete={() => onFriendEventDelete()}
      >
          <Card>
            <CardItem>
              <Icon name='md-calendar'/>
              <Text>{eventName && eventName.trim()}</Text>
              <Text note>{ timeDisplayString }</Text>
          </CardItem>
        </Card>
     </SwiperWrapper>

  )
}

EventCard.PropTypes = {
  onSelectEventsView: React.PropTypes.func,
  onFriendEventDelete: React.PropTypes.func,
  onFriendEventUpdate: React.PropTypes.func,
  eventDateIso: React.PropTypes.string,
  onSwipeDelete: React.PropTypes.string,
  eventName: React.PropTypes.bool,
}
