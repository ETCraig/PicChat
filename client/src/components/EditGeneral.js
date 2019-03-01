import React, {Component} from 'react';

import {
    Container,
    Col,
    Form,
    FormGroup,
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
import {Link} from 'react-router-dom';
import AuthReducer from '../reducers/AuthReducer';

class EditGeneral extends Component {
    state = {
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
        open: false,
        data: '',
        variant: ''
    }
    handleChange = name => e => {
        this.setState({[name]: e.target.value});
    }
    handleSubmit = () => {
        const {user_name, email, first_name, last_name} = this.state;
        if(user_name !== '') {
            changeUserName({user_name})
                .then(({status, data}) => {
                    if(status === 200) {
                        this.setState({open: true, data, variant: 'Success'});
                    } else {
                        this.setState({open: true, data, variant: 'Error'});
                    }
                });
        }
        if(email !== '') {
            changeEmail({email})
                .then(({status, data}) => {
                    if(status === 200) {
                        this.setState({open: true, data, variant: 'Success'});
                    } else {
                        this.setState({open: true, data, variant: 'Error'});
                    }
                });
        }
        if(first_name !== '') {
            changeFirstName({first_name})
                .then(({status, data}) => {
                    if(status === 200) {
                        this.setState({open: true, data, variant: 'Success'});
                    } else {
                        this.setState({open: true, data, variant: 'Error'});
                    }
                });
        }
        if(last_name !== '') {
            changeLastName({last_name})
                .then(({status, data}) => {
                    if(status === 200) {
                        this.setState({open: true, data, variant: 'Success'});
                    } else {
                        this.setState({open: true, data, variant: 'Error'});
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
        this.setState({open: false});
    }
    render() {
        return(
            <div>
                <Container>
                    <Col>
                        <Label>Username</Label>
                        <Input 
                            name='user_name'
                            placeholder={auth.user.user_name}
                            onChange={this.handleChange()}
                        />
                    </Col>
                    <Col>
                        <Label>Email</Label>
                        <Input 
                            name='email'
                            placeholder={auth.user.email}
                            onChange={this.handleChange()}
                        />
                    </Col>
                    <Col>
                        <Label>First Name</Label>
                        <Input 
                            name='first_name'
                            placeholder={auth.user.first_name}
                            onChange={this.handleChange()}
                        />
                    </Col>
                    <Col>
                        <Label>Last Name</Label>
                        <Input 
                            name='last_name'
                            placeholder={auth.user.last_name}
                            onChange={this.handleChange()}
                        />
                    </Col>
                </Container>
                <Button onClick={this.handleSubmit}>Save Changes</Button>
                <Link to='/payment-methods'><button>Payment Methods</button></Link>
            </div>
        );
    }
}

export default EditGeneral;