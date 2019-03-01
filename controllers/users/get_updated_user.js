const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const {secretOrKey} = require('../../config/Keys');

module.exports = get_updated_user = async (req, res) => {

    try{
        let user = await Users.findById({_id: req.user.id})
            .populate('profile', ['bio'])
        console.log(user);

        const payload = {
            id: user._id,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar
        }

        jwt.sign(
            payload,
            secretOrKey,
            {
                expiresIn: 1000 * 60
            },
            (err, token) => {
                res.json({success: true, token: 'Bearer ' + token});
            }
        );
    } catch(err) {
        let errors = {}
        errors.user = "could not get updated user."
        res.status(400).json(errors)
    }
}