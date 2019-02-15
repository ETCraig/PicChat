import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/AuthActions';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
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
            <div>
                <h1>Login</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    <input
                        name='email'
                        type='email'
                        placeholder='Email'
                        onChange={this.onChange}
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        onChange={this.onChange}
                    />
                    <button type='submit'>Login</button>
                </form>
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