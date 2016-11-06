export const updateGiftDesc = (friendId, giftId, giftDesc) => {
  console.log('updateGift', friendId, giftId, giftDesc);
    return {
      type: 'UPDATE_GIFT_DESC',
      payload: {
        friendId: friendId, 
        giftId: giftId,
        giftDesc: giftDesc}
    }
  }

export const createFriendToggleModalVisible = () => ({type: 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE'})

export const _createFriend = (friendName, bday) => ({type: 'CREATE_FRIEND', payload: {friendName, bday}});
// modal visibility toggle called
export const createFriend = (friendName, bday) => {
    console.log('bday input:', bday);
    bday = (bday) ? bday : '???';
    return function(dispatch, getState) {
       dispatch(_createFriend(friendName, bday));
       let state = getState();
       const latestFriendId = state.user.data[state.user.data.length - 1].friendId;
       dispatch(selectFriend(latestFriendId));
       dispatch(createFriendToggleModalVisible());
    }
}
// friendId
export const addGift = (friendId) => {
    console.log(friendId, 'addgift called');
    return {
        type: 'ADD_GIFT',
        // e.g {giftName: 'new gift'}
        payload: {friendId}
    }
}


export const selectFriend = (friendId) => {
    return {
        type: 'SELECT_FRIEND',
        payload: {friendId}
    }
}

