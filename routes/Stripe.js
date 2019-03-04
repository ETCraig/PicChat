const express = require('express');
const router = express.Router();
const passport = require('passport');

const CREATE_PAYMENT_METHOD = require('../controllers/stripe/create_payment_method');
const DELETE_PAYMENT_METHOD = require('../controllers/stripe/delete_payment_method');
const GET_PAYMENT_METHODS = require('../controllers/stripe/get_payment_methods');
const SUBSCRIBE_TO_CREATOR = require('../controllers/stripe/subscribe_to_creator');

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

router.post('/subscribe',
    passport.authenticate('jwt', {
        session: false
    }),
    SUBSCRIBE_TO_CREATOR
);

module.exports = router;