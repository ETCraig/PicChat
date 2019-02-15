import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../actions/AuthActions';
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
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
        if (nextProps.errors) {
            let { errors } = nextProps;
            this.setState({ errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        let {
            userName,
            firstName,
            lastName,
            email,
            password,
            password2
        } = this.state;
        e.preventDefault();
        const newUser = {
            userName,
            firstName,
            lastName,
            email,
            password,
            password2
        }
        this.props.registerUser(newUser, this.props.history);
    }
    render() {
        return (
            <div>
                <h1>Create Your New Account</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    <input
                        name='userName'
                        type='name'
                        placeholder='userName'
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <input
                        name='firstName'
                        type='name'
                        placeholder='firstName'
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <input
                        name='lastName'
                        type='name'
                        placeholder='lastName'
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <input
                        name='password2'
                        type='password'
                        placeholder='Confirm Password'
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    <button type='submit'>Create Account</button>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));