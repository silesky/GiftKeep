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
export const GiftCard = ({deleteGift, updateGiftDesc, giftDesc, updateGiftTitle, giftTitle}) => {

  // should take a name, birthday and text prop, along with being editable and so forth
        return (
           <Container >
               <Content>
                   <Card>
                       <CardItem style={{backgroundColor: 'rgb(77, 144, 254)'}} header>
                        <Input 
                          

                          style={{color: 'white', fontWeight: '700'}}
                          value={giftTitle} 
                          onChangeText={(input) => {
                            updateGiftTitle(input)
                          }}
                        />
                          <Button transparent>
                            <Icon 
                              name='ios-close-circle-outline'
                              style={{color: 'white',fontSize: 30 }}
                              onPress={() => deleteGift()} 
                            />
                          </Button>
                       </CardItem>
                       <CardItem cardBody>     
                        <Input 
                          placeholder="your gift description..."
                          multiline={true}
                          value={giftDesc} 
                          onChangeText={(input) => {
                            updateGiftDesc(input)
                          }}
                        />
                     </CardItem>
                   </Card>
               </Content>
           </Container>

        );
}