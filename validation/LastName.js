const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLastInput(data) {
    let errors = {};

    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';

    if (!Validator.isLength(data.last_name, { min: 2, max: 25 })) {
        errors.last_name = 'First name must be 2-25 characters.'
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Name is Required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}