export const increment = () => ({'type': 'INCREMENT'})
export const addFriend = (name) => {
   return {
    type: 'ADD_FRIEND',
    payload: { name },
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