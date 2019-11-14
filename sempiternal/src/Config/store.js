import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import mageReducer from "../Components/Game/Monsters/Mage/reducer"
import playerReducer from "../Components/Game/Player/reducer"
import mapReducer from "../Components/Game/Map/reducer"
import fireballReducer from "../Components/Game/Monsters/Attacks/Fireball/reducer"
import worldReducer from "../Components/Game/World/reducer"
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
    fireball: fireballReducer,
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