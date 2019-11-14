//this allows us to get the map out of the redux store as a prop call tiles
const initialState = {
    tiles: [],
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case "add_Tiles":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default mapReducer