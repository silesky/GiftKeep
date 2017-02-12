import React from 'react';

import {
    Header,
    Title,
    Button,
    Text,
    Icon,
    Container
} from 'native-base';

import colors from '../themes/colors'
import LightTheme from '../themes/LightTheme';


export const TopBar = ({drawerOpen, friendName, testClick}) => {
      return (
            <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
                <Button transparent
                    onPress={() => drawerOpen()}>
                    <Icon name='ios-menu' />
                </Button>
                <Title style={{color: colors.$bigHeadingTextColor}}>{friendName || 'Gifter'}</Title>
                <Button transparent
                    onPress={() => testClick()}>
                    <Icon name='ios-settings' />
                </Button>
            </Header>

                )
}
