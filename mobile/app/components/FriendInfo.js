import React from 'react';
import {
    Text,
    List, 
    ListItem
} from 'native-base';

export const FriendInfo = ({friendName, bday}) => {
        return (
                 <List>
                    <ListItem>
                        <Text>{`2 months until ${friendName}'s birthday on ${bday}.`} </Text>
                    </ListItem>
               
                </List>

            )    
       }
    

