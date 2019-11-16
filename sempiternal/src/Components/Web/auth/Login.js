import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import classnames from 'classnames';
import "./login.css";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) this.props.history.push("/game");
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/game");
            console.log("yo mamma")
            window.location.reload();
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        // console.log(userData);
        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;
        

        return (
            <div className="container">
                <div className="row">
                    <div className="col 12">
                        <Link to="/landing">
                            <h3 className="material-icons left"><span class='far'>&#xf359;</span></h3> 
                        </Link>
                        <div>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="p-tag">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>

                        {/* JUMBOTRON */}

                        <div className="jumbotron jumbo-register">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                            <label htmlFor="email"></label>
                                <input onChange={this.onChange} value="email" value={this.state.email} error={errors.email} name="email" type="email" id="input-login" className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
                               
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <h6 className="h6-input">name</h6>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} value={this.state.password} error={errors.password} name="password" type="password" id="input-login" className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
                                <label htmlFor="password"></label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <h6 className="h6-input final-input">password</h6>
                            <div className="col s12">
                                <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{
                                    width: "150px",
                                    alignContent: "center",
                                }} type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        </div>
                        <div className="col s12 center-align">
                            <footer>
                                <h6>© 2019 Gaming App. All Rights Reserved</h6>
                                <h6 className="h6-color"> Created by Michael Vega & Marcia Zegarra</h6>
                            </footer>
                        </div>
                    </div>
     
                </div>                
            </div> 
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);