import React, { Component } from 'react';

import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
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
    }
    handleUpdate() {
        const { newPassword: password, confirmPassword } = this.state;
        const data = {
            password,
            confirmPassword
        };
        changeUserPassword(data);
    }
    verifyPassword = async () => {
        const { old_password: password } = this.state
        const isVerified = await verifyPasswordConfirm({ password });
        if (isVerified) this.setState({ oldMatch: true });
    }
    render() {
        const { oldMatch } = this.state;
        return (
            <Container>
                <h3>Change Password</h3>
                <br />
                <Input
                    name="old_password"
                    type="password"
                    onChange={this.handleChange('old_password')}
                />
                {oldMatch ? <h4>Successfully Verified!</h4> : <h4>Please verify your password.</h4>}

                <Button
                    onClick={this.verifyPassword}
                    disabled={oldMatch}
                >
                    Verify Password
                </Button>
                <Input
                    name="newPassword"
                    type="password"
                    onChange={this.handleChange('newPassword')}
                    disabled={!oldMatch}
                />
                <Input
                    name='confirmPassword'
                    type='password'
                    onChange={this.handleChange('confirmPassword')}
                    disabled={!oldMatch}
                />
                <Button
                    onClick={this.handleUpdate}
                    disabled={!oldMatch}
                >
                    Update Password
                </Button>
            </Container>
        );
    }
}

export default EditPassword;