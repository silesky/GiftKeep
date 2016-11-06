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
export const GiftCard = ({giftName, friendId, friendName, updateGiftDesc, giftDesc}) => {
  console.log('rerender', 'current giftname:', giftName);
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
                        <Input value={giftDesc} onChangeText={(input) => {
                          updateGiftDesc(input)
                          console.log('you are typing into friendName:', friendName) 
                          }}
                        />
                    </InputGroup>
                       </CardItem>
                   </Card>
               </Content>
           </Container>

        );
}