import React from 'react';

import {
    Header,
    Title,
    Button,
    Text,
    Icon
} from 'native-base';


export const TopBar = ({drawerOpen}) => {
        return (
            <Header>
                <Button transparent
                onPress={() => drawerOpen()}>
                    <Icon name='ios-menu' />
                </Button>
                <Title>Gifter</Title>
                <Button transparent>
                    <Icon name='ios-settings' />
                </Button>
            </Header>     
                )
}