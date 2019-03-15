import React, { Component } from 'react';
import '../styles/EditPassword.css';

import Footer from './Footer';
import { verifyPasswordConfirm, changeUserPassword } from '../services/Profile.Services';

class EditPassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        oldMatch: false
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(this.state.newPassword)
    }
    verifyPassword = async () => {
        const { oldPassword: password } = this.state
        const isVerified = await verifyPasswordConfirm({ password });
        if (isVerified) this.setState({ oldMatch: true });
    }
    handleUpdate = () => {
        console.log(this.state.newPassword)
        const { newPassword: password, confirmPassword } = this.state;
        const data = {
            password,
            confirmPassword
        };
        changeUserPassword(data);
    }
    render() {
        const { oldMatch } = this.state;
        return (
            <div>
                <div id='edit-pass'>
                    <div>
                        <h3>Change Password</h3>
                        <br />
                        <input
                            name="oldPassword"
                            type="password"
                            onChange={this.handleChange('oldPassword')}
                        />
                        {oldMatch ? <h4>Successfully Verified!</h4> : <h4>Please verify your password.</h4>}

                        <button
                            className='verify-btn'
                            onClick={this.verifyPassword}
                            disabled={oldMatch}
                        >
                            Verify Password
                        </button>
                        <br />
                        <input
                            name="newPassword"
                            type="password"
                            onChange={this.handleChange('newPassword')}
                            disabled={!oldMatch}
                        />
                        <input
                            name='confirmPassword'
                            type='password'
                            onChange={this.handleChange('confirmPassword')}
                            disabled={!oldMatch}
                        />
                        <button
                            className='change-btn'
                            onClick={this.handleUpdate}
                            disabled={!oldMatch}
                        >
                            Update Password
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default EditPassword;