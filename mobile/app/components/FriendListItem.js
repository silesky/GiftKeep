import React from 'react';
import {
    ListItem,
    Text,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
export const FriendListItem = ({friendName, selectFriend, deleteFriend}) => {
    const swipeoutBtns = [{ 
        text: 'X',
        onPress: () => deleteFriend(),

    }]
    return (
        <Swipeout 
            autoClose={true}
            right={swipeoutBtns}>
           <ListItem button onPress={() => selectFriend()}>
                <Text>{friendName}</Text>
            </ListItem>    
            </Swipeout>
        )
}
