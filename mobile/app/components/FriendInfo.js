import React from 'react';
import moment from 'moment';
import {
    Text,
    List, 
    ListItem
} from 'native-base';

export const FriendInfo = ({friendName, bday}) => {
        const parsedBday = moment(bday, 'MM-DD')
        const friendBdayStringLong = `${parsedBday.format('MMMM')} ${parsedBday.format('D')}`;
        const parsedCurrentDate = moment(moment(), 'MM-DD')
        const myDiff = moment(parsedBday.diff(parsedCurrentDate))
        const howMuchTimeStringLong = `${myDiff.format('M')} month(s), ${myDiff.format('D')} day(s)`;

        return (
                 <List>
                    <ListItem>
                        <Text>{`${howMuchTimeStringLong} until ${friendName}'s birthday on ${friendBdayStringLong}!`} </Text>
                    </ListItem>
               
                </List>

            )    
       }
    

