import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import mageReducer from "../Components/Game/Monsters/Mage/reducer"
import mage2Reducer from "../Components/Game/Monsters/Mage2/reducer"
import mage3Reducer from "../Components/Game/Monsters/Mage3/reducer"
import playerReducer from "../Components/Game/Player/reducer"
import mapReducer from "../Components/Game/Map/reducer"
import fireballReducer from "../Components/Game/Monsters/Attacks/Fireball/reducer"
import fireball2Reducer from "../Components/Game/Monsters/Attacks/Fireball2/reducer"
import fireball3Reducer from "../Components/Game/Monsters/Attacks/Fireball3/reducer"
import worldReducer from "../Components/Game/World/reducer"
import hitReducer from "../Components/Game/Actions/Hit/reducer"
import authReducer from "../reducers/authReducers";
import errorReducer from '../reducers/errorReducers';
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk)
const createStoreWithMiddleware = compose(middleware)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//where states are saved with corresponding keys
//They map state and dispatch to props
const rootReducer = combineReducers({
    
    player: playerReducer,
    mage: mageReducer,
    mage2: mage2Reducer,
    mage3: mage3Reducer,
    fireball: fireballReducer,
    fireball2: fireball2Reducer,
    fireball3: fireball3Reducer,
    hit: hitReducer,
    map: mapReducer,
    world: worldReducer,
    auth: authReducer,
    errors: errorReducer
})

// const {store} = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunk))
//     //allows browser to inspect redux store
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// )
const store = createStoreWithMiddleware(createStore)(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;