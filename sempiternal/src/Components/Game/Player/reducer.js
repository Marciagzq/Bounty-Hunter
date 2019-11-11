
const initialState = {
    //position along x and y axis of the player
    position: [0, 0],
    spriteLocation: "0px 0px",
    direction: "east",
    walkIndex: 0,
    hp: 7.5,
    maxhp: 15,
    ad: 3,
    mp: 20,
    maxmp: 20,
    lvl: 1,
    xpLv: 20,
    xp: 5,
    map: 1,
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