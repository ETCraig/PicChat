const User = require('../../models/Users');
const Image = require('../../models/Image');

module.exports = get_user_profile = async (req, res) => {
    let user = req.user._id;
    console.log('USER', user)
    let profile = req.params.userId;
    console.log('PROFILE', profile);
    try {
        res.status(200).json(true)
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_profile.";
        res.status(404).json(errors);
    }
}