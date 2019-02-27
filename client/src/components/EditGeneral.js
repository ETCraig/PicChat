import React, {Component} from 'react';

import {
    changeUserName, 
    changeEmail, 
    changeFirstName, 
    changeLastName
} from '../services/Profile.Services';

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

            </div>
        );
    }
}

export default EditGeneral;