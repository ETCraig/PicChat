import React, { Component } from 'react';
import '../styles/Login.css';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { loginUser } from '../actions/AuthActions';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: 'customer@gmail.com',
            password: 'Customer1',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/Feed');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/Feed');
        }
        if (nextProps.errors) {
            const { errors } = nextProps;
            this.setState({ errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        let { email, password } = this.state;
        e.preventDefault();
        const userData = {
            email,
            password
        }
        this.props.loginUser(userData);
    }

    render() {
        return (
            <div id='Login'>
                <div className='login-wrap'>
                    <div className='login-left'>
                        <div className='login-content'>
                            <div className='login-title'>
                                <h1>Welcome Back!</h1>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div>
                                    <label>Email</label>
                                    <input type='email' name='email' className='login-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' name='password' className='login-input' onChange={this.onChange} />
                                </div>
                                <button className='login-btn'>Sign In</button>
                            </form>
                            <div className='login-links'>
                                <a href='www.google.com'>Forgot Password</a>
                            </div>
                            <div className='login-or'>
                                <hr className='hr' />
                                <span>OR</span>
                                <hr className='hr' />
                            </div>
                            <Link to='/Register' className='login-second-btn'>Create an Account</Link>
                        </div>
                        <footer id='login-footer'>
                            <p>Copyright &copy; 2019, E.T. Craig All Rights Reserved</p>
                            <div>
                                <a href='https://github.com/ETCraig/PicChat'>Source Code</a> | <a href='https://www.linkedin.com/in/ethan-craig-93000015a/'>Creator</a>
                            </div>
                        </footer>
                    </div>
                    <div className='login-right'>
                        <div id='login-img-wrap'>
                            <div className='login-img-content'>
                                <h1 className='login-text'><strong>Follow the Best</strong></h1>
                            </div>
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
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { loginUser })(Login);