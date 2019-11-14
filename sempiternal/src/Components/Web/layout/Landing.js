import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplashScreen from '../splashScreen';
import "./style.css";


class Landing extends Component {
    render() {
        return (
            <body>
            <div className="body">
            <div className="container align-wrapper preload" id="preload" style={{ height: "75vh" }}>
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>Ready for the action?</h4>
                        <br />
                        <div className="col s6">
                            <Link to="/register" >
                    
                                <button type="button" className="btn btn-outline-secondary">Register</button>
                            </Link>
                        </div>
                        <div className="col s6">
                        <Link to="/login" >
                    <button type="button" className="btn btn-outline-secondary">Login</button>
                </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </body>
        );
    }
}

export default Landing;