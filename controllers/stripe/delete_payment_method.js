const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('../../validation/Stripe');

module.exports = delete_payment_method = async (req, res) => {

    try {
        let sourceId = req.params;
        console.log('SourceId', sourceId);
        let { stripe_customer_id } = req.user;
        stripe.customers.deleteSource(
            stripe_customer_id,
            sourceId,
            function (err, source) {
                console.log('ERR', err);
                console.log('SOURCE', source);
                if (source === null) {
                    res.sendStatus(200);
                }
                if (err) {
                    errors.endpoint = "delete_payment_method"
                    errors.delete_payment_option = "failed at stripe.customers.deleteSource"
                    return res.status(500).json(errors);
                }
            });
    } catch (err) {
        let errors = {};
        errors.videos = "failed at delete_payment_method.";
        res.status(404).json(errors);
    }
}