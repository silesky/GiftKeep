export const increment = () => ({'type': 'INCREMENT'})
export const submitFriend = ( friendName = "New Friend" ) => {
    console.log('addfriend action called');
   return {
    type: 'ADD_FRIEND',
    payload: { friendName },
    }
}

export const addFriendToggleModalVisible = () => {
    console.log('modal visibility toggle action called');
    return {
        type: 'ADDFRIEND_TOGGLE_MODAL_VISIBLE'
    }
}

// modal visibility toggle called
export const addFriend = (friendName) => {
    return function(dispatch, getState) {
        dispatch(submitFriend(friendName));
        dispatch(addFriendToggleModalVisible());
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
    console.log(friendId, "->friendId");
    return {
        type: 'SELECT_FRIEND',
        payload: {friendId}
    }
}

