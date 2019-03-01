import React, { Component } from 'react';
import '../styles/Login.css';

import { connect } from 'react-redux';
import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { loginUser } from '../actions/AuthActions';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: 'userthree@gmail.com',
            password: 'Usethree',
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
            <Container className="Login-Container">
                <h2>Login</h2>
                <Form noValidate onSubmit={this.onSubmit} className="Login-Form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                name='email'
                                type='email'
                                placeholder='Email'
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
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