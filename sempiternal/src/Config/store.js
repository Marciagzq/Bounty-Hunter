import { createStore, combineReducers} from "redux";
import playerReducer from "../Components/Player/reducer"

//where states are saved with corresponding keys
//They map state and dispatch to props
const rootReducer = combineReducers({
    
    player: playerReducer,
})

const store = createStore(
    rootReducer,
    //allows browser to inspect redux store
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store;