import React, { Component } from 'react';
import '../styles/EditGeneral.css';

import {
    changeUserName,
    changeEmail,
    changeFirstName,
    changeLastName,
    changeUserAvatar
} from '../services/Profile.Services';
import Footer from './Footer';
import { getUserProfile } from '../services/Profile.Services';
import { Link } from 'react-router-dom';

class EditGeneral extends Component {
    state = {
        user: [],
        avatar: '',
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
        uri: '',
        fileType: '',
        mimeType: '',
        selectedFile: null,
        open: false,
        data: '',
        variant: ''
    }
    componentDidMount() {
        console.log('Passing')
        console.log(this.props.match.params.userId)
        getUserProfile(this.props.match.params.userId).then(res => {
            console.log(res)
            let { data } = res;
            console.log(data)
            this.setState({ user: data.user, avatar: data.user.avatar });
            console.log(this.state)
        });
    }
    handleChange = name => e => {
        this.setState({ [name]: e.target.value });
    }
    handleSelectedFile = event => {
        let file = event.target.files[0];
        console.log(file);
        console.log(file.type);
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif') {
            let uriParts = file.type.split('/');
            let fileType = uriParts[uriParts.length - 1];
            this.setState({
                avatar: URL.createObjectURL(file),
                uri: file,
                fileType,
                mimeType: file.type,
                selectedFile: event.target.files[0]
            });
        }
    }
    handleSubmit = () => {
        const { avatar, user_name, email, first_name, last_name, uri } = this.state;
        console.log(uri)
        if (uri) {
            var data = new FormData();
            data.append('avatar', uri);
            console.log(data)
            changeUserAvatar(data)
                .then(({ status, data }) => {
                    if (status === 200) {
                        this.setState({ open: true, data, variant: 'Success' });
                    } else {
                        this.setState({ open: true, data, variant: 'Error' });
                    }
                });
        }
        if (user_name !== '') {
            changeUserName({ user_name })
                .then(({ status, data }) => {
                    if (status === 200) {
                        this.setState({ open: true, data, variant: 'Success' });
                    } else {
                        this.setState({ open: true, data, variant: 'Error' });
                    }
                });
        }
        if (email !== '') {
            changeEmail({ email })
                .then(({ status, data }) => {
                    if (status === 200) {
                        this.setState({ open: true, data, variant: 'Success' });
                    } else {
                        this.setState({ open: true, data, variant: 'Error' });
                    }
                });
        }
        if (first_name !== '') {
            changeFirstName({ first_name })
                .then(({ status, data }) => {
                    if (status === 200) {
                        this.setState({ open: true, data, variant: 'Success' });
                    } else {
                        this.setState({ open: true, data, variant: 'Error' });
                    }
                });
        }
        if (last_name !== '') {
            changeLastName({ last_name })
                .then(({ status, data }) => {
                    if (status === 200) {
                        this.setState({ open: true, data, variant: 'Success' });
                    } else {
                        this.setState({ open: true, data, variant: 'Error' });
                    }
                });
        }
        this.setState({
            user_name: '',
            email: '',
            first_name: '',
            last_name: ''
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    }
    render() {
        return (
            <div>
                <div id='edit-general'>
                    <form>
                        <img
                            src={this.state.avatar}
                            alt='User Avatar'
                            className='edit-avatar'
                        />
                        <input type='file' onChange={this.handleSelectedFile} />
                        <label>Username</label>
                        <input
                            name='user_name'
                            placeholder={this.state.user.user_name}
                            onChange={this.handleChange('user_name')}
                        />
                        <label>Email</label>
                        <input
                            name='email'
                            placeholder={this.state.user.email}
                            onChange={this.handleChange('email')}
                        />
                        <label>First Name</label>
                        <input
                            name='first_name'
                            placeholder={this.state.user.first_name}
                            onChange={this.handleChange('first_name')}
                        />
                        <label>Last Name</label>
                        <input
                            name='last_name'
                            placeholder={this.state.user.last_name}
                            onChange={this.handleChange('last_name')}
                        />
                        <button onClick={this.handleSubmit} className='save-btn'>
                            Save Changes
                        </button>
                    </form>
                    <Link to='/edit-password'>
                        <button className='edit-btn'>Edit Password</button>
                    </Link>
                    <Link to='/payment-methods'>
                        <button className='edit-btn'>Payment Methods</button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
}

export default EditGeneral;