const { stripeKeys } = require('../config/Keys');
const { publishable_key, secret_key } = stripeKeys;
const stripe = require('stripe')(secret_key);

module.exports = stripe;