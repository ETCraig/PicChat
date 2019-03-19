const { publishable_key, secret_key} = require('../config/Keys');
const stripe = require('stripe')(secret_key);

module.exports = stripe;