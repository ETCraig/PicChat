const ImageLibrary = require('../../models/ImageLibrary');
const Subscriptions = require('../../models/Subscription');
const stripe = require('../../validation/Stripe');

module.exports = unsubscribe_from_coach = async (req, res) => {
    console.log('BODY', req.body);
    let creator = req.body.creatorId;
    let user = req.user._id;
    console.log('CREATOR', creator);
    console.log('USER', user);
    try {
        let stripeSub = await Subscriptions.findOne({ $and: [{ "to_creator": creator }, { "from_user": user }] });
        let changeSub = await Subscriptions.findOneAndUpdate(
            { $and: [{ "to_creator": creator }, { "from_user": user }] },
            { $set: { active: false } },
            { new: true },
            function (err, subscription) {
                console.log(err);
                if (err) {
                    errors.endpoint = "unsubscribe_to_coach"
                    errors.unsubscribe_to_coach = "failed at Subscription.findOneAndUpdate"
                    return res.status(500).json(errors)
                }
                console.log(subscription);
            }
        );
        let changeImg = await ImageLibrary.updateMany(
            { $and: [{ "user": user }, { "creator": creator }] },
            { $set: { disabled: true } },
            { new: true },
            function (err, VideoLibrary) {
                console.log('ERR', err);
                if (err) {
                    errors.endpoint = "unsubscribe_to_coach"
                    errors.unsubscribe_to_coach = "failed at VideoLibrary.findByIdAndUpdate"
                    return res.status(500).json(errors)
                }
                console.log(VideoLibrary);
            }
        );
        stripe.subscriptions.del(
            stripeSub.stripe_subscription_id,
            function (err, confirmation) {
                console.log(err)
                if (err) {
                    errors.endpoint = "unsubscribe_to_coach"
                    errors.subscribe_to_coach = "failed at stripe.subscriptions.del"
                    return res.status(500).json(errors)
                }
                console.log(err)
                console.log(confirmation)
                res.status(200).json({ subscribed: false })
            }
        );
    } catch (err) {
        let errors = {};
        errors.videos = "failed at subscribe_to_creator.";
        res.status(404).json(errors);
    }
}