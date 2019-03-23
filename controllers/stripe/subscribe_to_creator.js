const ImageLibrary = require('../../models/ImageLibrary');
const Receipts = require('../../models/Receipts');
const Subscriptions = require('../../models/Subscription');
const Plans = require('../../models/Plan');
const stripe = require('../../validation/Stripe');

module.exports = subscribe_to_creator = async (req, res) => {
    let errors = {};
    let user = req.user.stripe_customer_id;
    let creator = req.body.creatorId;
    let source = req.body.sourceId;
    console.log(user, creator, source);
    try {
        let plan = await Plans.find({ "creator_id": creator });
        console.log('PLAN', plan);
        let plan_id = plan[0].plan_id;
        console.log(plan_id)
        stripe.subscriptions.create({
            customer: user,
            items: [{ plan: plan_id }],
            default_source: source,
            billing: 'charge_automatically'
        }, async function (err, Subscription) {
            console.log('ERR', err);
            console.log('SUB', Subscription);
            let time = Subscription.created;
            console.log('TIME', time)
            let subId = Subscription.id;
            let userId = req.user._id;
            let findPastSub = await Subscriptions.findOne({ "to_creator": creator, "from_user": userId, "active": false });
            if (findPastSub) {
                const updateSub = await Subscriptions.findOneAndUpdate(
                    { $and: [{ "to_creator": creator }, { "from_user": userId }, { "active": false }] },
                    { $set: { active: true, stripe_subscription_id: subId } },
                    { new: true }
                );

                const updateImg = await ImageLibrary.updateMany(
                    { $and: [{ "user": userId }, { "creator": creator }] },
                    { $set: { disabled: false } },
                    { new: true }
                );
                let [subscrip, library] = await Promise.all([updateSub, updateImg]);
                console.log(subscrip, library);
            } else {
                const newSubscription = new Subscriptions({
                    to_creator: creator,
                    from_user: userId,
                    stripe_subscription_id: subId,
                    active: true
                });
                newSubscription.save()
                    .catch(err => {
                        errors.endpoint = "subscribe_to_creator"
                        errors.subscribe_to_creator = "failed at newSubscription"
                        return res.status(500).json(errors)
                    });
            }
            await stripe.charges.list({ created: time, limit: 1 }, async function (err, charges) {
                console.log('ERR', err);
                console.log('CHARGES', charges);
                let amount = charges.data[0].amount;
                let currency = charges.data[0].currency;
                let receipt_url = charges.data[0].receipt_url;
                const newReceipt = new Receipts({
                    user: req.user._id,
                    amount: amount,
                    currency: currency,
                    receipt_url: receipt_url,
                    time: time
                });
                newReceipt.save();
                console.log(newReceipt);
                return res.status(200).json({ subscribed: true })
            });
        });
    } catch (err) {
        let errors = {};
        errors.videos = "failed at subscribe_to_creator.";
        res.status(404).json(errors);
    }
}