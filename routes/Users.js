const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/Keys');
const passport = require('passport');

const GET_UPDATED_USER = require('../controllers/users/get_updated_user');
const GET_USER_HANDLE = require('../controllers/users/get_user_handle');
const GET_USER_PROFILE = require('../controllers/users/get_user_profile');
const LOGIN_USER = require('../controllers/users/Login');
const REGISTER_USER = require('../controllers/users/Register');
const UPDATE_FIRST_NAME = require('../controllers/users/update_first_name');
const UPDATE_LAST_NAME = require('../controllers/users/update_last_name');
const UPDATE_USER_EMAIL = require('../controllers/users/update_user_email');
const UPDATE_USER_NAME = require('../controllers/users/update_user_name');
const UPDATE_USER_PASSWORD = require('../controllers/users/update_user_password');
const VERIFY_USER_PASSWORD = require('../controllers/users/verify_user_password');

const User = require('../models/Users');
console.log('HIT TWO')

router.post('/register', REGISTER_USER);

router.post('/login', LOGIN_USER);

router.get('/profile/:userId', 
    passport.authenticate('jwt', {
        session: false
    }),
    GET_USER_PROFILE
);

router.get('/latest', 
    passport.authenticate('jwt', {
        session: false
    }),
    GET_UPDATED_USER
);

router.post('/user_name',
    passport.authenticate('jwt', {
        session: false
    }),
    UPDATE_USER_NAME
);

router.post('/email',
    passport.authenticate('jwt', {
        session: false
    }),
    UPDATE_USER_EMAIL
);

router.post('/first_name',
    passport.authenticate('jwt', {
        session: false
    }),
    UPDATE_FIRST_NAME
);

router.post('/last_name',
    passport.authenticate('jwt', {
        session: false
    }),
    UPDATE_LAST_NAME
);

router.post('/verify_password',
    passport.authenticate('jwt', {
        session: false
    }),
    VERIFY_USER_PASSWORD
);

router.post('/password', 
    passport.authenticate('jwt', {
        session: false
    }),
    UPDATE_USER_PASSWORD
);

router.get('/handle/:handle', 
    passport.authenticate('jwt', {
        session: false
    }),
    GET_USER_HANDLE
);

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({id: req.user.id, user_name: req.user.user_name, email: req.user.email});
});

module.exports = router;