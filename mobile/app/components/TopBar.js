import React from 'react';

import {
    Header,
    Title,
    Button,
    Text,
    Icon
} from 'native-base';


export const TopBar = ({drawerOpen, friendName, testClick, allGiftsVisibilityToggle}) => {
      return (
            <Header>
                <Button transparent
                    onPress={() => drawerOpen()}>
                    <Icon name='ios-menu' />
                </Button>
                <Title>{(friendName) ? friendName : 'Gifter'}</Title>
                  <Button transparent
                    onPress={() => allGiftsVisibilityToggle()}>
                    <Icon name='ios-globe-outline' />
                    </Button>
                <Button transparent
                    onPress={() => testClick()}>
                    <Icon name='ios-settings' />
                </Button>
            </Header>     
                )
}