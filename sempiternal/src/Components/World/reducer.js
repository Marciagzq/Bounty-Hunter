const initialState = {
    //world ticks
    timer: null,
    counter: 0
}

const worldReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT_TIMER":
            return state + 1;
        default:
            return state
    }
}

export default worldReducer