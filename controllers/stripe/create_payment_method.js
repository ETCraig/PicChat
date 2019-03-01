const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('../../validation/Stripe');

const Users = require('../../models/Users')

module.exports = create_payment_method = async (req, res) => {

    try {
        console.log(req.body)
        let { tokenId } = req.body;
        console.log('TOK', tokenId.id)
        let { stripe_customer_id, _id: user_id } = req.user;
        let user = await Users.findOne({ _id: user_id });
        console.log('USER', user, stripe_customer_id)
        if (stripe_customer_id) {
            stripe.customers.retrieve(
                stripe_customer_id,
                function async(err, customer) {
                    if (err) {
                        console.log(err)
                    }
                    if (customer.deleted) {
                        stripe.customers.create({
                            email: req.user.email
                        }, function async(err, customer) {
                            if (err) {
                                errors.endpoint = "create_payment_method"
                                errors.create_payment_option = "failed at stripe.customers.create"
                                return res.status(500).json(errors)
                            }
                            const customer_id = customer._id

                            stripe.sources.create({
                                type: 'card',
                                currency: 'usd',
                                token: tokenId.id,
                                owner: {
                                    email: req.user.email
                                }
                            }, function (err, source) {
                                stripe.customers.createSource(
                                    customer_id,
                                    { source: source.id },
                                    function async(err, source) {
                                        user.stripe_customer_id = customer_id;
                                        user.save()
                                            .then(saved => {
                                                console.log(saved);
                                            });
                                    }
                                )
                            })
                        })
                    } else {
                        stripe.sources.create({
                            type: 'card',
                            currency: 'usd',
                            token: tokenId.id,
                            owner: {
                                email: req.user.email
                            }
                        }, function async(err, source) {
                            stripe.customers.createSource(
                                stripe_customer_id,
                                { source: source.id },
                                function async(err, source) {
                                    if (source.id) {
                                        res.sendStatus(200);
                                    }
                                    if (err) {
                                        console.log('Err at create source.', err);
                                    }
                                }
                            );
                        });
                    }
                }
            );
        }
    } catch (err) {
        let errors = {};
        errors.videos = "failed at create_payment_method.";
        res.status(404).json(errors);
    }
}