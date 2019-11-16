const initialState = {
    //position along x and y axis of the player
    position: [0, 0],
    pseudoPosition: [360, 160],
    spriteLocation: "0px 0px",
    direction: "east",
    walkIndex: 0,
    hp: 15,
    maxhp: 15,
    percHP: 100,
    ad: 3,
    mp: 20,
    maxmp: 20,
    lvl: 1,
    xpLv: 20,
    xp: 5,
    map: 1,
    top: 80,
    left: 360,
    killCount: 0,
    winCount: 3
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "move_Player":
            return {
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer