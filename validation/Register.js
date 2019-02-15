const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.userName = !isEmpty(data.userName) ? data.userName: '';

}