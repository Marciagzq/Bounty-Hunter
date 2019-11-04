
const initialState = {
    //position along x and y axis of the player
    position: [0, 0],
    spriteLocation: "0px 0px",
    direction: "east",
    walkIndex: 0,
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Player":
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer