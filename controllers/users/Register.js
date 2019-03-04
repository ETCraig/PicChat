const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const stripe = require('../../validation/Stripe');

const validateRegisterInput = require('../../validation/Register');

const Plans = require('../../models/Plan');
const User = require('../../models/Users');

module.exports = register_user = async (req, res) => {
    console.log('HIT', req.body)
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        console.log('HIT2')
        return res.status(400).json(errors);
    }
    try {
        User.findOne({ "email": req.body.email }).then(user => {
            if (user) {
                console.log('HIT3')
                errors.email = 'Email already in Use.'
                return res.status(400).json(errors);
            } else {
                stripe.customers.create({
                    email: req.body.email
                }, function (err, customer) {
                    stripe.products.create({
                        name: req.body.user_name,
                        type: 'service'
                    }, function (err, product) {
                        console.log('PRODUCT', product)
                        stripe.plans.create({
                            nickname: 'Monthly Subscription',
                            product: product.id,
                            amount: 500,
                            currency: 'usd',
                            interval: 'month'
                        }, function (err, plan) {
                            console.log('PLAN', plan)
                            const newUser = new User({
                                user_name: req.body.user_name,
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                email: req.body.email,
                                password: req.body.password,
                                handle: req.body.handle,
                                stripe_customer_id: customer.id
                            });
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    console.log('PASSED')
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                    const newPlan = Plans({
                                        creator_id: newUser._id,
                                        plan_id: plan.id,
                                        product_id: product.id
                                    });
                                    newPlan.save()
                                        .then(user => res.json(user))
                                        .catch(err => console.log(err))
                                });
                            });
                        })
                    })
                })
            }
        });
    } catch (err) {
        let errors = {};
        errors.videos = "failed at register_user.";
        res.status(404).json(errors);
    }
}