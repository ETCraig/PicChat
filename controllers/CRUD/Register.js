const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const validateRegisterInput = require('../../validation/Register');

const user = require('../../models/Users');

const register_user = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    user.findOne({ "email": req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already in Use.'
            return res.status(400).json(errors);
        } else {
            const newUser = new user({
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    });
}

module.exports = register_user;