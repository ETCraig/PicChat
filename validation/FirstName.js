const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateFirstInput(data) {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';

    if (!Validator.isLength(data.first_name, { min: 2, max: 25 })) {
        errors.first_name = 'First name must be 2-25 characters.'
    }
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'Name is Required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}