const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('../../validation/Stripe');

module.exports = get_payment_methods = async (req, res) => {

    console.log('USER', req.user);
    let { stripe_customer_id } = req.user;
    console.log("stripe_customer_id", stripe_customer_id);
    console.log("typeof stripe_customer_id", typeof stripe_customer_id);

    try {
        stripe.customers.listSources(stripe_customer_id,
            function (err, sources) {
                console.log(err);
                if (err) {
                    let errors = {};
                    errors.endpoint = "get_sources"
                    errors.get_payment_methods = "Failed at stripe.customers.listSources"
                    return res.status(500).json(errors)
                }
                res.status(200).json(sources);
            });
    } catch (err) {
        let errors = {}
        errors.endpoint = "get_payment_methods"
        errors.get_sources = "Could not get sources."
        res.status(500).json(errors)
    }
}