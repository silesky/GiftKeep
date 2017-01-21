import React from 'react';
import {
    Button,
    Icon,
    Text,
    List, 
    ListItem,
    Header,
    Card,
    CardItem,
    Title
} from 'native-base';

export const NoGiftsAlert = ({
  addGiftBtnClick,
}) => {
  return (
      <Card>
        <CardItem style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>
            No Gifts Added.
            </Text>
            <Button 
              
              onPress={() => addGiftBtnClick() }>
              <Icon name="md-add-circle" />
              <Text>Add a Gift!</Text>
            </Button>
            </CardItem>
        </Card>
  )
}


