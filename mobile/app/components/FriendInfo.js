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
    const monthDiff = myDiff.format('M');
    const monthString = (monthDiff > 1) ? 'months' : 'month';
    const dayDiff = myDiff.format('D');
    const dayString = (dayDiff > 1) ? 'days' : 'day';
    const howMuchTimeStringLong = `${monthDiff} ${monthString}, ${dayDiff} ${dayString}`; return (
             <List>
                <ListItem>
                    <Text>{`${howMuchTimeStringLong} until ${friendName}'s birthday on ${friendBdayStringLong}!`} </Text>
                </ListItem>
           
            </List>

        )    
   }


