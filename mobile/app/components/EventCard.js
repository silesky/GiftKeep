import React, { PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { EI } from '../icons/'
import { SwiperWrapper } from '../components/'
import {
  Button,
  Container,
  Card,
  CardItem,
  Content,
  Icon,
  Input,
  InputGroup,
  Text,
  Title
} from 'native-base'
// import * as Util  from './../utils/utils';

export const EventCard = ({
  onSelectEventsView,
  onFriendEventUpdate,
  onFriendEventDelete,
  eventName,
  eventTime
}) => {
  // should take a name, birthday and text prop, along with being editable and so forth
  return (
     <SwiperWrapper

        onSwipeUpdate={() => onFriendEventUpdate()}
        onSwipeDelete={() => onFriendEventDelete()}
      >
            <Card>
                <CardItem >
                  <Icon name='md-bulb'/>
                  <Text>{eventName ? `${eventName.trim()}... ${eventTime}.` : `${eventTime}` }</Text>
              </CardItem>
            </Card>
            </SwiperWrapper>

  )
}

EventCard.PropTypes = {
  onSwipeDelete: React.PropTypes.string,
  eventName: React.PropTypes.bool
}
