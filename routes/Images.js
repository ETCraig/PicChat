const express = require('express');
const router = express.Router();
const passport = require('passport');

const CREATE_IMAGE = require('../controllers/CRUD/CreateImage');

router.post(
    '/create_image',
    passport.authenticate('jwt', {
        session: false
    }),
    CREATE_IMAGE
);