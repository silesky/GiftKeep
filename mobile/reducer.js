const initialState = 1;
export const reducer = (state = initialState, action) => {
    console.log("oldState: ", state)
    switch (action.type) {
        case 'INCREMENT':
            const newState = state + 1;
            console.log("newState: ", newState)
            return newState
    }
 

}