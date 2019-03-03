const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const stripe = require('../../validation/Stripe');

const validateRegisterInput = require('../../validation/Register');

const User = require('../../models/Users');

const register_user = async (req, res) => {
    console.log('HIT', req.body)
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        console.log('HIT2')
        return res.status(400).json(errors);
    }
    User.findOne({ "email": req.body.email }).then(user => {
        if (user) {
            console.log('HIT3')
            errors.email = 'Email already in Use.'
            return res.status(400).json(errors);
        } else {
            stripe.customers.create({
                email: req.body.email
            }, function (err, customer) {
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
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            })
        }
    });
}

module.exports = register_user;