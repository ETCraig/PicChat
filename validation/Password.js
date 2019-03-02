const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePasswordInput(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is Required.';
    }
    if (!Validator.isLength(data.password, { min: 5, max: 20 })) {
        errors.password = 'Password must be 5 - 20 Characters.';
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm password is Required.';
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must Match.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}