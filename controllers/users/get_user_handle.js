const Users = require('../../models/Users');

module.exports = get_user_handle = async (req, res) => {
    try {
        console.log(req.params.handle);
        let userData = await Users.find({ "handle": req.params.handle }).populate(
            'user', [
                'avatar',
                '_id',
                'user_name',
                'first_name',
                'last_name',
                'email'
            ]
        )
        console.log(userData)
        let data = await Promise.all(userData);
        console.log(data)
        res.status(200).json(data)
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_handle.";
        res.status(404).json(errors);
    }
}