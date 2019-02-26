const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/Keys');
const passport = require('passport');

const GET_USER_PROFILE = require('../controllers/CRUD/get_user_profile');
const LOGIN_USER = require('../controllers/CRUD/Login');
const REGISTER_USER = require('../controllers/CRUD/Register');

const User = require('../models/Users');
console.log('HIT TWO')
router.post('/register', REGISTER_USER);

router.post('/login', LOGIN_USER);

router.get(
    '/profile/:userId', 
    passport.authenticate('jwt', {
        session: false
    }),
    GET_USER_PROFILE
);


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({id: req.user.id, user_name: req.user.user_name, email: req.user.email});
});

module.exports = router;