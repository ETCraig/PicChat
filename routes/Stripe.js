const express = require('express');
const router = express.Router();
const passport = require('passport');

const ADD_CARD = require('../controllers/stripe/add_card');
const CHECK_SUB_STATUS = require('../controllers/stripe/check_sub_status');
const DELETE_CARD = require('../controllers/stripe/delete_card');
const GET_CREATOR_SUBS = require('../controllers/stripe/get_creator_subs');
const SUBSCRIBE_PAST_SUB = require('../controllers/stripe/subscribe_past_sub');
const SUBSCRIBE_TO_CREATOR = require('../controllers/stripe/subscribe_to_creator');
const UNSUBSCRIBE_FROM_COACH = require('../controllers/stripe/unsubscribe_from_creator');

router.post(
    '/add_card',
    passport.authenticate('jwt', {
        session: false
    }),
    ADD_CARD
);

router.get(
    '/check_sub_status',
    passport.authenticate('jwt', {
        session: false
    }),
    CHECK_SUB_STATUS
);

router.delete(
    '/delete_card',
    passport.authenticate('jwt', {
        session: false
    }),
    DELETE_CARD
);

router.get(
    '/get_creator_subs',
    passport.authenticate('jwt', {
        session: false
    }),
    GET_CREATOR_SUBS
);

router.post(
    '/subscribe_past_sub',
    passport.authenticate('jwt', {
        session: false
    }),
    SUBSCRIBE_PAST_SUB
);

router.post(
    '/subscribe_to_creator',
    passport.authenticate('jwt', {
        session: false
    }),
    SUBSCRIBE_TO_CREATOR
);

router.post(
    '/unsubscribe_from_creator',
    passport.authenticate('jwt', {
        session: false
    }),
    UNSUBSCRIBE_FROM_COACH
);

module.exports = router;