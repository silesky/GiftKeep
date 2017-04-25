// this shouldn't show
import React from 'react'
import { Button, Icon, Text, Card, CardItem } from 'native-base'

export const NoFriendsAlert = ({ addFriendBtnClick }) => {
  return (
    <Card>
      <CardItem style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Text>No Friends Added.</Text>
        <Button danger onPress={() => addFriendBtnClick()}>
          <Icon name='ios-person-add' />
          <Text>Add a Friend</Text>
        </Button>
      </CardItem>
    </Card>
  )
}
