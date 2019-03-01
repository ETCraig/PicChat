const user = require('../../models/Users');
const Image = require('../../models/Image');

module.exports = get_user_profile = async (req, res) => {
    try {
        let user_id = req.user._id;
        console.log('USER', user_id)
        let profile = req.params.userId;
        console.log('PROFILE', profile);
        user.findById(user_id).then(owner => {
            console.log(owner)
            res.status(200).json(owner)
        })
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_profile.";
        res.status(404).json(errors);
    }
}