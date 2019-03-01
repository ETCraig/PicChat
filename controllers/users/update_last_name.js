const Users = require('../../models/Users');
const validateLastInput = require('../../validation/LastName');

module.exports = update_last_name = async (req, res) => {
    const { errors, isValid } = validateLastInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { last_name } = req.body;
    try {
        let user = await Users.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { last_name } },
            { new: true })
        res.status(200).json(user);
    } catch (err) {
        let errors = {};
        errors.videos = "failed at update_last_name.";
        res.status(404).json(errors);
    }
}