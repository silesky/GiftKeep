import React from 'react';
import {
    Footer,
    FooterTab,
    Button,
    Icon
} from 'native-base'
export const BottomBar = ({createFriendToggleModalVisible, addGift}) => {
    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => createFriendToggleModalVisible()} transparent>
                    <Icon name='ios-person-add' />
                </Button>  
                <Button onPress={() => addGift()} transparent>
                    <Icon name='ios-add' />
                </Button>  
            </FooterTab>
        </Footer>
        )
}