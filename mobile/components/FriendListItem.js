import React from 'react';
import {
    ListItem,
    Text,
} from 'native-base';

export const FriendListItem = ({friendName, increment}) => {
    return (
           <ListItem button onPress={() => increment()}>
                <Text>{friendName}</Text>
            </ListItem>    
        )
}
