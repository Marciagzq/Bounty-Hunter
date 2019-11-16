const initialState = {
    //position along x and y axis of the player
    position: [40, 400],
    direction: "West",
    currentCD: 0,
    hp: 9,
    att: 1,
    maxCD: 3,
    attacking: false,
    locked: false,
    isAlive : true,
}

const mage3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Mage3":
            return {
                ...state,
                ...action.payload
            }
        case "set_Pos3":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default mage3Reducer