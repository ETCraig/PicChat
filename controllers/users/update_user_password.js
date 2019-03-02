const Users = require('../../models/Users');
const validatePasswordInput = require('../../validation/Password');
const bcrypt = require('bcryptjs');

module.exports = update_user_password = async (req, res) => {
    const { errors, isValid } = validatePasswordInput(req.body);
    console.log('DUDE', req.body)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let { password } = req.body;

    try {
        let user = await Users.findOne({ _id: req.user.id });

        if (user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, passwordHash) => {
                    if (err) throw err;

                    Users.findOneAndUpdate(
                        { _id: req.user.id },
                        { $set: { password: passwordHash } },
                        { new: true }
                    )
                        .then(user => res.status(200).json(user))
                        .catch(err => {
                            res.status(400).json({ errors: 'Meh' });
                        });
                });
            });
        }
    } catch(e) {
        let errors = {};
        errors.videos = "failed at update_user_password.";
        res.status(404).json(errors);
    }
}