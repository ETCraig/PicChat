const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
let { secretOrKey } = require('../../config/Keys');
const Image = require('../../models/Image');
const Plan = require('../../models/Plan');
const Subscriptions = require('../../models/Subscription');
const stripe = require('../../validation/Stripe');

module.exports = get_profile_item = async (req, res) => {
    console.log('HIT the BACK')
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, secretOrKey);
            req.user = decoded;
        }
    }

    let errors = {};

    try {
        let { userid } = req.params;

        let findProfilePromise = await User.findOne(
            { _id: userid }
        ).populate('user', [
            'avatar',
            'user_name',
            'handle',
        ]);

        const findImagesPromise = await Image.find({ by_creator: userid }).countDocuments();
        
        let checkSubscribed = await Subscriptions.find(
            {
                $and: [
                    { "to_creator": userid },
                    { "from_user": req.user.id },
                    { "active": true }
                ]
            }
        );
            console.log('CHECKED')
        let planId = await Plan.findOne({ "creator_id": userid });
        let getSubs = await stripe.subscriptions.list({ plan: planId.plan_id })

        const [foundProfile, imageCount, subs, subed] = await Promise.all([findProfilePromise, findImagesPromise, getSubs, checkSubscribed]);
        console.log('GOING TO DATA')
        let data = {
            user: {...foundProfile._doc},
            subscribed: false,
            subscribersCount: 0,
            subscribedYou: false,
            imageCount,
            isMe: false
        }
        console.log(data)
        if (req.user) {
            if (userid === req.user.id.toString()) {
                data.isMe = true;
            }
        }
        if (subed.length >= 1) {
            data.subscribed = true
        }
        if (subs) {
            console.log(subs.data.length);
            data.subscribersCount = subs.data.length
        }
        // if (followingIDS.includes(userid)) {
        //     data.followed = true
        // }

        res.status(200).json(data);
    } catch (err) {
        errors.endpoint = "get_profile_item"
        errors.get_sources = "Could not get items."
        res.status(500).json(errors)
    }
}