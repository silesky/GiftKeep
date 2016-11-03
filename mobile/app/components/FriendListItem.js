import React from 'react';
import {
    ListItem,
    Text,
} from 'native-base';

export const FriendListItem = ({friendName, addFriend}) => {
    return (
           <ListItem button onPress={() => addFriend()}>
                <Text>{friendName}</Text>
            </ListItem>    
        )
}
