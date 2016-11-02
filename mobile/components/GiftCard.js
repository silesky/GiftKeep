import React from 'react';
import {
    Container,
    Card,
    CardItem,
    Content,
    Text,
} from 'native-base';
import { lipsum } from '../util';
export const GiftCard = ({giftName}) => {
  // should take a name, birthday and text prop, along with being editable and so forth
        return (
           <Container >
               <Content>
                   <Card>
                       <CardItem header>
                           <Text>{giftName}</Text>
                       </CardItem>
                       <CardItem>
                           <Text>{lipsum}</Text>
                       </CardItem>
                   </Card>
               </Content>
           </Container>

        );
}