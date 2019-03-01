const Users = require('../../models/Users');
const validateNameInput = require('../../validation/UserName');

module.exports = update_user_name = async (req, res) => {
    const { errors, isValid } = validateNameInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { user_name } = req.body;
    try {
        let user = await Users.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { user_name } },
            { new: true })
        res.status(200).json(user);
    } catch (err) {
        let errors = {};
        errors.videos = "failed at update_user_name.";
        res.status(404).json(errors);
    }
}