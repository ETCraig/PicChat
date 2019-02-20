require('dotenv').config;

const Orders = require('../../models/Order');
const Plan = require('../../models/Plans');
const Subscription = require('../../models/Subscription');
const VideoLibrary = require('../../models/VideoLibrary');

module.exports = subscribe_past_sub = async (req, res) => {
    const { secretOrKey, stripeKeys } = require("../../config/keys");
    const { publishable_key, secret_key } = stripeKeys;
    const stripe = require("stripe")(secret_key);

    try {
        let stripe_customer_id = req.user.stripe_customer_id;
        let creator = req.body.creator_id;

    } catch (e) {
        let errors = {}
        errors.endpoint = "subscribe_past_customer"
        errors.subscribe_past_customer = "Could not subscribe at this time"
        res.status(500).json(errors)
    }
}