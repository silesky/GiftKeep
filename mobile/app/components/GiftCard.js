import React from 'react';
import {
    Button,
    Container,
    Card,
    CardItem,
    Content,
    Icon,
    Input,
    InputGroup,
    Text,
    Title
} from 'native-base';
import { lipsum } from './../utils/util';
export const GiftCard = ({deleteGift, updateGiftDesc, giftDesc, giftTitle}) => {
  console.log('rerender', 'current giftTitle:', giftTitle);
  // should take a name, birthday and text prop, along with being editable and so forth
        return (
           <Container >
               <Content>
                   <Card>
                       <CardItem header>
                           <Title>{giftTitle}</Title>
                          <Button transparent>
                            <Icon 
                              name='ios-close' 
                              onPress={() => deleteGift()} 
                            />
                          </Button>
                       </CardItem>
                       <CardItem>
                        <InputGroup borderType='underline'>             
                        <Input 
                          value={giftDesc} 
                          onChangeText={(input) => {
                            updateGiftDesc(input)
                          }}
                        />
                    </InputGroup>
                       </CardItem>
                   </Card>
               </Content>
           </Container>

        );
}