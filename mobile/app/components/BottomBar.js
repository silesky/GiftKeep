import React from 'react';
import {
    Footer,
    FooterTab,
    Button,
    Icon
} from 'native-base'
export const BottomBar = ({addFriend, addGift}) => {
    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => addFriend()} transparent>
                    <Icon name='ios-person-add' />
                </Button>  
                <Button onPress={() => addGift()} transparent>
                    <Icon name='ios-add' />
                </Button>  
            </FooterTab>
        </Footer>
        )
}