// this shouldn't show
import React from 'react'
import moment from 'moment'
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
} from  './../sporks/native-base'

export const NoEventsAlert = ({
  addEventBtnClick
}) => {
  return (
             <Card>
                <CardItem style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                 <Text>'No Events Added.'</Text>
                    <Button
                      info
                      onPress={() => addEventBtnClick() }>
                      <Icon name="md-calendar" />
                      <Text>Add an Event</Text>
                    </Button>
                    </CardItem>
                </Card>

  )
}
