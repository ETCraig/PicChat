const Users = require('../../models/Users');
const Images = require('../../models/Image');
const stripe = require('../../validation/Stripe');

module.exports = get_user_profile = async (req, res) => {
    try {
        let user_id = req.user._id;
        console.log('USER', user_id)
        let userData = await Users.findById(user_id).populate(
            'user', [
                'avatar',
                '_id',
                'user_name',
                'first_name',
                'last_name',
                'email'
            ]
        );
        let planId = await Plan.findOne({ "creator_id": user_id });
        console.log('Plan', planId.plan_id);
        let images = await Images.find({ "by_creator": user_id });
        console.log('Images', images)
        let getSubs = await stripe.subscriptions.list({ plan: planId.plan_id });
        console.log('Subs', getSubs)
        const [user, subs] = await Promise.all([userData, getSubs]);
        console.log(user, subs);

        let data = {
            user,
            images,
            subscribers: 0
        };
        if (subs) {
            console.log(subs.data.length);
            data.subscribers = subs.data.length
        }
        res.status(200).json(data);
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_profile.";
        res.status(404).json(errors);
    }
}