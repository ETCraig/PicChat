const Users = require('../../models/Users');
const Images = require('../../models/Image');
const Subscriptions = require('../../models/Subscription');

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
        );
        console.log(userData)
        console.log(userData[0]._id)
        let checkSubscribed = await Subscriptions.find(
            {
                $and: [
                    { "to_creator": userData[0]._id },
                    { "from_user": req.user._id },
                    { "active": true }
                ]
            }
        );
        let images = await Images.find({"by_creator": userData[0]._id});
        console.log(images)
        console.log(checkSubscribed)
        const [user, subed] = await Promise.all([userData, checkSubscribed]);
        console.log(user, subed);
        let data = {
            user,
            images,
            subscribed: false
        };
        console.log(subed.length)
        if(subed.length >= 1) {
            data.subscribed = true
        }
        console.log(data)
        res.status(200).json(data)
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_handle.";
        res.status(404).json(errors);
    }
}