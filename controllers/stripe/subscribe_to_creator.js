const Receipts = require('../../models/Receipts');
const Subscriptions = require('../../models/Subscription');
const Plans = require('../../models/Plan');
const stripe = require('../../validation/Stripe');

module.exports = subscribe_to_creator = async (req, res) => {
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
        }, function (err, Subscription) {
            console.log('ERR', err);
            console.log('SUB', Subscription);
            let time = Subscription.created;
            let subId = Subscription.id;
            stripe.charges.list({ created: time, limit: 1 }, function (err, charges) {
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
                const newSubscription = new Subscriptions({
                    to_creator: creator,
                    from_user: req.user._id,
                    stripe_subscription_id: subId,
                    active: true
                });
                newSubscription.save()
                    .then(sub => {
                        return res.status(200).json({ subscribed: true });
                    })
                    .catch(err => {
                        errors.endpoint = "subscribe_to_creator"
                        errors.subscribe_to_creator = "failed at newSubscription"
                        return res.status(500).json(errors)
                    });
            });
        });
    } catch (err) {
        let errors = {};
        errors.videos = "failed at subscribe_to_creator.";
        res.status(404).json(errors);
    }
}