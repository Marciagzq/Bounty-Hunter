const initialState = {
    //position along x and y axis of the player
    position: [320, 280],
    direction: "West",
    currentCD: 0,
    hp: 9,
    att: 1,
    maxCD: 3,
    attacking: false,
    locked: false,
    isAlive : true,
}

const mageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Mage":
            return {
                ...state,
                ...action.payload
            }
        case "set_Pos":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default mageReducer