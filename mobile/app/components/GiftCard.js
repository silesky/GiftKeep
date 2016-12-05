import React, { PropTypes } from 'react';
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
//import * as Util  from './../utils/utils';

export const GiftCard = ({
  deleteGift, 
  friendId,
  friendName,
  giftDesc,  
  giftTitle,
  updateGiftDesc, 
  updateGiftTitle, 
  footerIsVisible,
  }) => {
  // should take a name, birthday and text prop, along with being editable and so forth
        return (
           <Container>
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
                      { footerIsVisible 
                        ? (<CardItem>
                              <Button small style={{backgroundColor: 'purple'}} >
                              <Icon name='ios-people' style={{color:'white'}} />
                                <Text>{ friendName ? friendName : ''}</Text>
                              </Button>             
                          </CardItem>) 
                        : false
                      }
                   </Card>
               </Content>
           </Container>

        );
}

GiftCard.PropTypes = {
  deleteGift: React.PropTypes.func,
  friendName: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  updateGiftTitle: React.PropTypes.func,
  updateGiftDesc: React.PropTypes.func,
}