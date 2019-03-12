import React, { Component } from 'react';
import '../styles/Register.css';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerUser } from '../actions/AuthActions';
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
            handle: '',
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
            user_name,
            first_name,
            last_name,
            email,
            password,
            password2,
            handle
        } = this.state;
        e.preventDefault();
        const newUser = {
            user_name,
            first_name,
            last_name,
            email,
            password,
            password2,
            handle
        }
        console.log(newUser)
        this.props.registerUser(newUser, this.props.history);
    }
    render() {
        return (
            // <div>
            //     <h1>Create Your New Account</h1>
            //     <Container className="Register-Container">
            //         <Form noValidate onSubmit={this.onSubmit} className="Register-Form">
            //             <Col>
            //                 <FormGroup>
            //                     <label>User Name</label>
            //                     <imput
            //                         name='user_name'
            //                         type='name'
            //                         value={this.state.name}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>First Name</label>
            //                     <imput
            //                         name='first_name'
            //                         type='name'
            //                         value={this.state.name}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>Last Name</label>
            //                     <imput
            //                         name='last_name'
            //                         type='name'
            //                         value={this.state.name}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>Email</label>
            //                     <imput
            //                         name='email'
            //                         type='email'
            //                         value={this.state.email}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>Password</label>
            //                     <imput
            //                         name='password'
            //                         type='password'
            //                         value={this.state.password}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>Confirm Password</label>
            //                     <imput
            //                         name='password2'
            //                         type='password'
            //                         value={this.state.password2}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <Col>
            //                 <FormGroup>
            //                     <label>Profile Handle</label>
            //                     <imput
            //                         name='handle'
            //                         type='text'
            //                         value={this.state.handle}
            //                         onChange={this.onChange}
            //                     />
            //                 </FormGroup>
            //             </Col>
            //             <button type='submit'>Create Account</button>
            //         </Form>
            //     </Container>
            <div id='Register'>
                <div className='register-wrap'>
                    <div className='register-left'>
                        <div className='register-content'>
                            <div className='register-title'>
                                <h1>Join the Community</h1>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div>
                                    <label>User Name</label>
                                    <input type='email' name='email' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>First Name</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <div>
                                    <label>Profile Handle</label>
                                    <input type='password' name='password' className='register-input' onChange={this.onChange} />
                                </div>
                                <button className='register-btn'>Sign In</button>
                            </form>
                            <div className='register-links'>
                                <a href='www.google.com'>Forgot Password</a>
                            </div>
                            <div className='register-or'>
                                <hr className='hr' />
                                <apn>OR</apn>
                                <hr className='hr' />
                            </div>
                            <Link to='/Login' className='register-second-btn'>Login to your Account</Link>
                        </div>
                        <footer id='register-footer'>
                            <p>Copyright &copy; 2019, E.T. Craig All Rights Reserved</p>
                            <div>
                                <a href='https://github.com/ETCraig/PicChat'>Source Code</a> | <a href='https://www.linkedin.com/in/ethan-craig-93000015a/'>Creator</a>
                            </div>
                        </footer>
                    </div>
                    <div className='register-right'>
                        <div id='register-img-wrap'>
                            <div className='register-img-content'>
                                <h1 className='register-text'><strong>Create, Follow, and Share</strong></h1>
                            </div>
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
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));