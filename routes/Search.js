const express = require('express');
const router = express.Router();
const passport = require('passport');

const GET_SEARCH_QUERY = require('../controllers/search/get_search_query');

router.get('/', GET_SEARCH_QUERY);

module.exports = router;