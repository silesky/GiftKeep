import React from 'react';
import {
    ListItem,
    Text,
} from 'native-base';

export const FriendListItem = ({friendName, selectFriend}) => {
    return (
           <ListItem button onPress={() => selectFriend()}>
                <Text>{friendName}</Text>
            </ListItem>    
        )
}
