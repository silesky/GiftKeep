import { initialStateUser } from './../initialState.js'
import { combineReducers } from 'redux'
import {
    createUuid
} from './../utils/util';

const user = (state = initialStateUser, action) => {

    //console.log("oldState: ", state)
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
               const newData = state.data.map(el => {
                if (el.friendId === friendId) {
                    el.gifts = [...el.gifts, {
                        giftName: 'new gift',
                        giftId: createUuid()
                    }]
                } 
                return el
            })
            return Object.assign({}, {data: newData})
        default:
            return state;
    }

}

const initialStateFirstUser = {selectedFriendId: initialStateUser.data[0].friendId};
const visible = (state = initialStateFirstUser, action) => {
    switch (action.type) {
        case 'SELECT_FRIEND':
        return {selectedFriendId: action.payload.friendId}
    default:
        return state;
    }
}

export const rootReducer = combineReducers({
    user, 
    visible
})




















