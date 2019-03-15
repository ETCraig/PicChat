const Users = require('../../models/Users');
const Images = require('../../models/Image');
const Plan = require('../../models/Plan');
const Subscriptions = require('../../models/Subscription');
const stripe = require('../../validation/Stripe');

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
        let planId = await Plan.findOne({ "creator_id": userData[0]._id });
        console.log('Plan', planId);
        let images = await Images.find({ "by_creator": userData[0]._id });
        let getSubs = await stripe.subscriptions.list({ plan: planId.plan_id })
        console.log(images);
        console.log(checkSubscribed);
        const [user, subed, subs] = await Promise.all([userData, checkSubscribed, getSubs]);
        console.log(user, subed);
        let data = {
            user,
            images,
            subscribed: false,
            subscribers: 0
        };
        console.log(subed.length)
        if (subed.length >= 1) {
            data.subscribed = true
        }
        if (subs) {
            console.log(subs.data.length);
            data.subscribers = subs.data.length
        }
        console.log(data)
        res.status(200).json(data)
    } catch (err) {
        let errors = {};
        errors.profile = "Failed at get_user_handle.";
        res.status(404).json(errors);
    }
}