import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import colors from './../themes/colors';
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
} from 'native-base';
//import * as Util  from './../utils/utils';
import {
  GiftCardInputTitle,
  GiftCardInputGiftDescription

} from './../components/'
export const GiftCard = ({
  deleteGift,
  friendId,
  friendName,
  giftDesc,
  giftTitle,
  updateGiftDesc,
  updateGiftTitle,
  footerIsVisible
}) => {
  // should take a name, birthday and text prop, along with being editable and so
  // forth
  return (
    <Card>
      <CardItem
        style={{
          backgroundColor: colors.$cardHeaderBg
        }}
        header>

           <GiftCardInputTitle
            giftTitle={giftTitle}
            updateGiftTitle={updateGiftTitle}
          />
        <Button transparent>
          <Icon
            name='ios-close-circle-outline'
            style={{
              color: 'white',
              fontSize: 30
            }}
            onPress={ () => deleteGift() }
          />
        </Button>
      </CardItem>
      <CardItem cardBody>
        <GiftCardInputGiftDescription
          updateGiftDesc={updateGiftDesc}
          giftDesc={giftDesc}
         />
      </CardItem>
      { footerIsVisible
        ? (
          <CardItem style={styles.footerCard}>
            <Button
              style={styles.button}
              disabled
              small
              textStyle={{
                color: 'white'
              }}>
              { friendName.toUpperCase() || '' }
            </Button>
          </CardItem>
        )
        : false
      }
    </Card>

  );
}

const styles = StyleSheet.create({
  footerCard: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    backgroundColor: 'purple'
  }
})
GiftCard.PropTypes = {
  deleteGift: React.PropTypes.func,
  friendName: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  updateGiftTitle: React.PropTypes.func,
  updateGiftDesc: React.PropTypes.func
}
