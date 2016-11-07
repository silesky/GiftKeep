import React from 'react';

import {
    Header,
    Title,
    Button,
    Text,
    Icon
} from 'native-base';


export const TopBar = ({drawerOpen, friendName}) => {
        return (
            <Header>
                <Button transparent
                onPress={() => drawerOpen()}>
                    <Icon name='ios-menu' />
                </Button>
                <Title>{friendName}</Title>
                <Button transparent>
                    <Icon name='ios-settings' />
                </Button>
            </Header>     
                )
}