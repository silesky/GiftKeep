import React from 'react';
import {
    Container,
    Card,
    CardItem,
    Content,
    Input,
    InputGroup,
    Text,
} from 'native-base';
import { lipsum } from './../utils/util';
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
                          <InputGroup borderType='underline' >             
                        <Input />
                    </InputGroup>
                       </CardItem>
                   </Card>
               </Content>
           </Container>

        );
}