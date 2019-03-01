const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.user_name = !isEmpty(data.user_name) ? data.user_name: '';
    data.first_name = !isEmpty(data.first_name) ? data.first_name: '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name: '';
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';
    
    if(!Validator.isLength(data.user_name, {min: 5, max: 25})) {
        errors.user_name = 'Name must be 5-20 characters.';
    }
    if(Validator.isEmpty(data.user_name)) {
        errors.user_name = 'Name is Required.';
    }
    if(!Validator.isLength(data.first_name, {min: 2, max: 25})) {
        errors.first_name = 'First name must be 2-25 characters.'
    }
    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = 'Name is Required.';
    }
    if(!Validator.isLength(data.last_name, {min: 2, max: 25})) {
        errors.last_name = 'First name must be 2-25 characters.'
    }
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Name is Required.';
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