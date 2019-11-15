import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SplashScreen from '../splashScreen';
import "./style.css";
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';


class Landing extends Component {
    render() {
        return (
            <body>
                <div className="body">
                    <div className="container align-wrapper preload" id="preload" style={{ height: "75vh" }}>
                        <div className="row">
                            <div className="col s12 center-align">

                                <h4><span><div className="pc-icon"></div></span>Ready for the action?</h4>
                                <br />

                                <div className="jumbotron">

                                    <Link to="/register" >
                                        <button type="button" className="btn btn-outline-secondary">Register</button>
                                    </Link>

                                    <Link to="/login" >
                                        <button type="button" className="btn btn-outline-secondary">Login</button>
                                    </Link>

                                </div>
                            </div>

                        </div>
                        <div className="col s12 center-align">
                            <footer>
                                <h6>© 2019 Gaming form. All Rights Reserved</h6>
                                <h6 className="h6-color"> Created by Michael Vega & Marcia Zegarra</h6>
                            </footer>
                        </div>

                    </div>
                </div>
            </body>
        );
    }
}

export default Landing;