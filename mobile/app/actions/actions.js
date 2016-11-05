import moment from 'moment';
export const createFriendToggleModalVisible = () => {
    console.log('modal visibility toggle action called');
    return {
        type: 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE'
    }
}

// modal visibility toggle called
export const createFriend = (friendName = 'new friend', bday = 'today') => {
    console.log(`createFriend dispatched... friendName: ${friendName} bday: ${bday}`, );
    return function(dispatch, getState) {
        dispatch({type: 'CREATE_FRIEND', payload: {friendName, bday}});
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

