const initialState = {
    //position along x and y axis of the player
    position: [160, 0],
    spriteLocation: "0px 0px",
    direction: "west",
    walkIndex: 0,
}

const mageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Mage":
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default mageReducer