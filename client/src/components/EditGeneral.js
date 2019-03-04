import React, { Component } from 'react';

import {
    Container,
    Col,
    Form,
    Label,
    Input,
    Button
} from 'reactstrap';
import {
    changeUserName,
    changeEmail,
    changeFirstName,
    changeLastName
} from '../services/Profile.Services';
import { getUserProfile } from '../services/Profile.Services';
import { Link } from 'react-router-dom';

class EditGeneral extends Component {
    state = {
        user: [],
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
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
            this.setState({ user: data });
            console.log(this.state.user)
        });
    }
    handleChange = name => e => {
        this.setState({ [name]: e.target.value });
    }
    handleSubmit = () => {
        const { user_name, email, first_name, last_name } = this.state;
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
                <Container>
                    <Form>
                        <Col>
                            <img src={this.state.user.avatar} alt='User Avatar' />
                        </Col>
                        <Col>
                            <Label>Username</Label>
                            <Input
                                name='user_name'
                                placeholder={this.state.user.user_name}
                                onChange={this.handleChange('user_name')}
                            />
                        </Col>
                        <Col>
                            <Label>Email</Label>
                            <Input
                                name='email'
                                placeholder={this.state.user.email}
                                onChange={this.handleChange('email')}
                            />
                        </Col>
                        <Col>
                            <Label>First Name</Label>
                            <Input
                                name='first_name'
                                placeholder={this.state.user.first_name}
                                onChange={this.handleChange('first_name')}
                            />
                        </Col>
                        <Col>
                            <Label>Last Name</Label>
                            <Input
                                name='last_name'
                                placeholder={this.state.user.last_name}
                                onChange={this.handleChange('last_name')}
                            />
                        </Col>
                        <Button onClick={this.handleSubmit}>Save Changes</Button>
                    </Form>
                </Container>
                <Link to='/edit-password'><button>Edit Password</button></Link>
                <Link to='/payment-methods'><button>Payment Methods</button></Link>
            </div>
        );
    }
}

export default EditGeneral;