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
import Intro from './Components/Web/intro/Intro';
import SplashScreen from './Components/Web/splashScreen';

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
                        {/* <Navbar /> */}
                        <Route exact path="/" component={SplashScreen} />
                        <Route exact path="/landing" component={Landing} />
                        <Route exact path="/register"  component={Register} />
                        <Route exact path="/login" component={Login} />
                        {/* change to intro */}
                        <Route exact path="/intro" component={Intro} />
                        <Switch>
                            {/* change to game */}
                            <PrivateRoute exact path="/game" component={Gamepage} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
