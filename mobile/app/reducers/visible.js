
import UUID from 'uuid-js';
import Moment from 'moment';


const initialStateFirstUser = {

  selectedFriendId: null,
  friendFormUpdatingSelectedFriendId: null,
  friendFormIsUpdating: null,
  friendFormIsVisible: false,
  friendFormNameInput: null,
  friendFormEventInput: [],
  friendFormEventDatePickerIsVisible: false,
  friendFormEventDatePickerSelectedEventId: null,
  friendFormBdayInput: "01-10",
  selectedTab: 'gifts',
  notificationText: null,
  bottomNotificationVisibility: false,
};

export const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {
    case 'RESET_VISIBLE': {
      return initialStateFirstUser
    }
    case 'SELECT_TAB':
      return { ...state, selectedTab: action.payload.selectedTab }

    case 'HYDRATE_VISIBLE': {
      return {
        ...action.payload, 
        friendFormIsVisible: false,  // no matter what, don't display this stuff 
        friendFormEventDatePickerIsVisible: false,
        friendFormEventDatePickerSelectedEventId: null,

      }
    }
    case 'SELECT_FRIEND':
      return { ...state, selectedFriendId: action.payload.friendId }

    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      return {
        ...state,
        friendFormIsVisible: !state.friendFormIsVisible
      };

    default:
      return state;
  }
}

