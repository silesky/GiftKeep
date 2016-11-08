import React from 'react';
import {
    ListItem,
    Text,
    Button,
    Title,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
export const FriendListItem = ({friendName, selectFriend, deleteFriend}) => {
    const swipeoutBtns = [{ 
        text: 'X',
        backgroundColor: 'red',
        onPress: () => deleteFriend(),
    }]
    return (
        <Swipeout
            backgroundColor="white"
            autoClose={true}
            right={swipeoutBtns}>
           <ListItem button onPress={() => selectFriend()}>
                <Text>{friendName}</Text>
            </ListItem>    
        </Swipeout>
        )
}
