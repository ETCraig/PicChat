const express = require('express');
const router = express.Router();
const passport = require('passport');

const CREATE_PAYMENT_METHOD = require('../controllers/stripe/create_payment_method');
const DELETE_PAYMENT_METHOD = require('../controllers/stripe/delete_payment_method');
const GET_PAYMENT_METHODS = require('../controllers/stripe/get_payment_methods');

router.get('/sources',
    passport.authenticate('jwt', {
        session: false
    }),
    GET_PAYMENT_METHODS
);

router.post('/create_payment_method',
    passport.authenticate('jwt', {
        session: false
    }),
    CREATE_PAYMENT_METHOD
);

router.delete('/delete_payment_method/:sourceId',
    passport.authenticate('jwt', {
        session: false
    }),
    DELETE_PAYMENT_METHOD
);

module.exports = router;