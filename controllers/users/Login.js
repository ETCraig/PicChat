const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/Keys');

const validateLoginInput = require('../../validation/Login');

const user = require('../../models/Users');

const login_user = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({ email }).then(user => {
        if (!user) {
            errors.email = "User doesn't exist.";
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    user_name: user.user_name
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { 
                        expiresIn: 100 * 60
                    },
                    (err, token) => {
                        res.json({ success: true, token: 'Bearer ' + token });
                    }
                );
            } else {
                errors.password = 'Password is incorrect.';
                return res.status(400).json(errors);
            }
        });
    });
}

module.exports = login_user;