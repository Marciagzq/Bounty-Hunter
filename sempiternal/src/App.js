// import React from 'react';
// import World from "./Components/Game/World/index"
// import HUD from "./Components/Game/UI/HUD/hud"
// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <World />
//         <HUD />
//       </div>
//     );
//   }
// }

// export default App;


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import Gamepage from "./Components/Web/Gamepage/index.js"
import store from './Config/store';

import './App.css';

import Navbar from './Components/Web/layout/Navbar';
import Landing from './Components/Web/layout/Landing';
import Register from './Components/Web/auth/Register';
import Login from './Components/Web/auth/Login';
import PrivateRoute from './Components/Web/private-route/PrivateRoute';
import Dashboard from './Components/Web/dashboard/Dashboard';

if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/game" component={Gamepage} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
