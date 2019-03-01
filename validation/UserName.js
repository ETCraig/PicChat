const  Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateNameInput(data) {
    let errors = {};

    data.user_name = !isEmpty(data.user_name) ? data.user_name : '';

    if(!Validator.isLength(data.user_name, {min: 5, max: 25})) {
        errors.user_name = 'Name must be 5-20 characters.';
    }
    if(Validator.isEmpty(data.user_name)) {
        errors.user_name = 'Name is Required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
} 