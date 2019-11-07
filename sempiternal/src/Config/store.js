import { createStore, combineReducers} from "redux";
import mageReducer from "../Components/Game/Monsters/Mage/reducer"
import playerReducer from "../Components/Game/Player/reducer"
import mapReducer from "../Components/Game/Map/reducer"
import worldReducer from "../Components/Game/World/reducer"

//where states are saved with corresponding keys
//They map state and dispatch to props
const rootReducer = combineReducers({
    
    player: playerReducer,
    mage: mageReducer,
    map: mapReducer,
    world: worldReducer
})

const store = createStore(
    rootReducer,
    //allows browser to inspect redux store
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store;