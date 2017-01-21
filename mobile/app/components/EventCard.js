import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
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
  Title,
} from 'native-base';
//import * as Util  from './../utils/utils';

export const EventCard = ({
  deleteGift,
  friendId,
  friendName,
  giftDesc,
  giftTitle,
  updateGiftDesc,
  updateGiftTitle,
  footerIsVisible,
  eventName,
  eventTime,
}) => {
  // should take a name, birthday and text prop, along with being editable and so forth
  return (
            <Card>
                <CardItem header>
                  <Title>{eventName}</Title>
                  <Button transparent>
                    <Icon 
                      name='ios-close-circle-outline'
                      style={{fontSize: 30 }}
                    />
                  </Button>
              </CardItem>
              <CardItem cardBody>
                <Text>{eventTime}</Text>
              </CardItem>
            </Card>

  );
}

EventCard.PropTypes = {}