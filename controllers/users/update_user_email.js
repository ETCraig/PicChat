const Users = require('../../models/Users');
const validateEmailInput = require('../../validation/LastName');

module.exports = update_user_email = async (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { email } = req.body;
    try {
        let user = await Users.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { email } },
            { new: true })
        res.status(200).json(user);
    } catch (err) {
        let errors = {};
        errors.videos = "failed at update_user_email.";
        res.status(404).json(errors);
    }
}