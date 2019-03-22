const express = require('express');
const router = express.Router();
const passport = require('passport');

const GET_FEED_IMAGES = require('../controllers/imgs/get_feed_images');
const GET_SINGLE_IMAGE = require('../controllers/imgs/get_single_image');
const GET_SAVED_IMAGES = require('../controllers/imgs/get_saved_images');
const GET_SEARCHED_IMAGE = require('../controllers/imgs/get_searched_image');
const LIKE_CREATOR_IMAGE = require('../controllers/imgs/like_creator_image');
const SAVE_CREATOR_IMAGE = require('../controllers/imgs/save_creator_image');
const UNLIKE_CREATOR_IMAGE = require('../controllers/imgs/dislike_creator_image');
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

router.post('/like/:image_id',
    passport.authenticate('jwt', {
        session: false
    }),
    LIKE_CREATOR_IMAGE
);

router.post('/dislike/:image_id',
    passport.authenticate('jwt', {
        session: false
    }),
    UNLIKE_CREATOR_IMAGE
);

router.get('/library',
    passport.authenticate('jwt', {
        session: false
    }),
    GET_SAVED_IMAGES
);

router.get('/search/:_id', 
    passport.authenticate('jwt', {
        session: false
    }),
    GET_SEARCHED_IMAGE
);

module.exports = router;