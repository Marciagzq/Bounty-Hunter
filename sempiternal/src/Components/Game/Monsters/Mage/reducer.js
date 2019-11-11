const initialState = {
    //position along x and y axis of the player
    position: [320, 280],
    direction: "West",
    currentCD: 0,
    maxCD: 3,
    attacking: false,
    locked: false,
}

const mageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Mage":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default mageReducer