const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.userName = !isEmpty(data.userName) ? data.userName: '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName: '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName: '';
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';

    if(!Validator.isLength(data.userName, {min: 5, max: 25})) {
        errors.userName = 'Name must be 5-20 characters.';
    }
    if(Validator.isEmpty(data.userName)) {
        errors.userName = 'Name is Required.';
    }
    if(!Validator.isLength(data.firstName, {min: 2, max: 25})) {
        errors.firstName = 'First name must be 2-25 characters.'
    }
    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'Name is Required.';
    }
    if(!Validator.isLength(data.lastName, {min: 2, max: 25})) {
        errors.lastName = 'First name must be 2-25 characters.'
    }
    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Name is Required.';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is Required.';
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid.';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is Required.';
    }
    if (!Validator.isLength(data.password, { min: 5, max: 20 })) {
        errors.password = 'Password must be 5 - 20 Characters.';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is Required.';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must Match.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}