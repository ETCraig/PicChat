const express = require('express');
const router = express.Router();
const passport = require('passport');

const GET_FEED_IMAGES = require('../controllers/imgs/get_feed_images');
const GET_SINGLE_IMAGE = require('../controllers/imgs/get_single_image');
const SAVE_CREATOR_IMAGE = require('../controllers/imgs/save_creator_image');
const UNSAVE_CREATOR_IMAGE = require('../controllers/imgs/unsave_creator_image');
const UPLOAD_NEW_IMAGE = require('../controllers/imgs/CreateImage');

console.log('YO BOY!')
router.post('/upload',
    passport.authenticate('jwt', {
        session: false
    }),
    UPLOAD_NEW_IMAGE
);

router.get('/feed',
    passport.authenticate('jwt', {
        session: false
    }),
    GET_FEED_IMAGES
);

router.get('/single/:image_id',
    passport.authenticate('jwt', {
        session: false
    }),
    GET_SINGLE_IMAGE
);

router.post('/save/:image_id',
    passport.authenticate('jwt', {
        session: false
    }),
    SAVE_CREATOR_IMAGE
);

router.post('/unsave/:image_id',
    passport.authenticate('jwt', {
        session: false
    }),
    UNSAVE_CREATOR_IMAGE
);

module.exports = router;