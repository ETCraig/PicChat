const Users = require('../../models/Users');
const validateFirstInput = require('../../validation/FirstName');

module.exports = update_first_name = async (req, res) => {
    const { errors, isValid } = validateFirstInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { first_name } = req.body;
    try {
        let user = await Users.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { first_name } },
            { new: true })
        res.status(200).json(user);
    } catch (err) {
        let errors = {};
        errors.videos = "failed at update_first_name.";
        res.status(404).json(errors);
    }
}