import React from 'react';
import {
    Footer,
    FooterTab,
    Button,
    Icon,
    Text,
} from 'native-base'
export const BottomBar = ({
  addGift,
  addEvent,
  friendFormVisibilityToggle,
  selectedTab,
}) => {
  console.log('selectedTab', selectedTab);
  const whichBtn = () => {
      let addBtn = {}
      switch (selectedTab) {
        case 'gifts':
          addBtn = {
            text: 'ADD GIFT',
            handler: addGift,
            icon: 'ios-add-circle-outline'
          }
          break;
        case 'events':
         addBtn = {
            text: 'ADD EVENT',
            handler: addEvent,
            icon: 'md-calendar',
          }
          break;
        case 'all gifts': 
        addBtn = { 
           text: 'ADD GIFT',
           handler: addGift,
           icon: 'ios-add',
        }
        break;
      }

      return addBtn;
  }

    return (
        <Footer>
             <FooterTab>
                <Button onPress={() => friendFormVisibilityToggle()} transparent>
                  <Icon name={'ios-person'} />
                </Button>  
                   <Button onPress={() => whichBtn().handler()} transparent>
                      <Text>{whichBtn().text}</Text>
                    <Icon name={whichBtn().icon} />
              </Button> 
          </FooterTab> 
        </Footer>
        )

}

BottomBar.PropTypes = {
  friendFormVisibilityToggle: React.PropTypes.bool,
  selectedTab: React.PropTypes.oneOf(['gifts', 'events', 'all gifts', ]),
  addBtnHandler: React.PropTypes.obj,

}