import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

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
    }
    render() {
        return(
            <div>

            </div>
        );
    }
}

export default Register;