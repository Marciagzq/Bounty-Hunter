import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import classnames from 'classnames';
import "./register.css";
// import Intro from './Components/Web/intro/Intro';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push("/intro");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) this.props.history.push("/intro");

        if (nextProps.errors) {
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        // console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <Link to="/landing">
                            <h3><span class='far'>&#xf359;</span></h3>
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                Register below
                            </h4>
                            {/* <div className="jumbotron"> */}
                        </div>

                            <p className="p-tag">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>

                                                    {/* JUMBOTRON */}

                        <div className="jumbotron jumbo-register">

                            <form noValidate onSubmit={this.onSubmit}>
                             
                                <div className="input-field col s12">
                                    <input onChange={this.onChange} value={this.state.name} error={errors.name} name="name" type="text" id="input-field" className={classnames("", { invalid: errors.name })} />
                                    <label htmlFor="name"></label>
                                    <span className="red-text">{errors.name}</span>
                                </div>
                                <h6 className="h6-input">name</h6>
                                
                                <div className="input-field col s12">
                                    <input onChange={this.onChange} value={this.state.email} error={errors.email} name="email" type="email" id="input-field" className={classnames("", { invalid: errors.email })} />
                                    <label htmlFor="email"></label>
                                    <span className="red-text">{errors.email}</span>
                                </div>
                                <h6 className="h6-input">@</h6>
                               
                                <div className="input-field col s12">
                                    <input onChange={this.onChange} value={this.state.password} error={errors.password} name="password" type="password" id="input-field" className={classnames("", { invalid: errors.password })} />
                                    <label htmlFor="password"></label>
                                    <span className="red-text">{errors.password}</span>
                                </div>
                                <h6 className="h6-input">password</h6>
                                
                                <div className="input-field col s12">
                                    <input onChange={this.onChange} value={this.state.password2} error={errors.password2} name="password2" type="password" id="input-field" className={classnames("", { invalid: errors.password2 })} />
                                    <label htmlFor="password2"></label>
                                    <span className="red-text">{errors.password2}</span>
                                </div>
                                <h6 className="h6-input final-input">repeat password</h6>
                                <div className="col s12">
                                    <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" style={{
                                        width: "150px",
                                        alignContent: "center",
                                    }} type="submit">
                                        Sign Up
                                </button>
                                </div>
                            </form>
                            {/* </div> */}
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
        
Register.propTypes = {
                    registerUser: PropTypes.func.isRequired,
                auth: PropTypes.object.isRequired,
                errors: PropTypes.object.isRequired
            };
            
const mapStateToProps = state => ({
                    auth: state.auth,
                errors: state.errors
            });
            
export default connect(mapStateToProps, {registerUser})(withRouter(Register));