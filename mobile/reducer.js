import initialState from './initialState.json'
import {
    createUuid
} from './util';
/*
 var state = {"data": [
            {   "order": 1,
                "friendName" : "Nick",
                "gifts" : [{"giftName": "The Once and Future King" }],
                "friendId": 123
            },

            {   "order": 2,
                "friendName" : "Dan",
                "gifts" : [{ "giftName": "The Beatles Revolver" }],
                "friendId": 456
            },
            {   "order": 3,
                "friendName" : "Stephen",
                "gifts" : [{ "giftName": "Serfas Bike Light" }],
                "friendId": 789
            }
         ]
}
 */
export const reducer = (state = initialState, action) => {

    console.log("oldState: ", state)
    switch (action.type) {
        case 'INCREMENT':
            console.log('INCREMENT CALLED, state: ', state)
            return state
        case 'ADD_FRIEND':
            const friendName = action.payload.friendName;
            return Object.assign({}, {
                data: [...state.data, {
                    friendId: createUuid(),
                    friendName: friendName,
                    gifts: []
                }]
            })
        case 'ADD_GIFT':
            const friendId = action.payload.friendId;
            const updatedFriendState = state.data.map(el => {
                if (el.friendId === friendId) {
                    el.gifts = [...el.gifts, {
                        giftName: 'new gift',
                        giftId: createUuid()
                    }]
                }
                return el
            })
            return state.data[updatedFriendState];
        default:
            return state;
    }

}