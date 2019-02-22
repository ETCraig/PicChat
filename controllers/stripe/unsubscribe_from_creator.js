// require('dotenv').config;

// const VideoLibrary = require('../../models/VideoLibrary');
// const Plan = require('../../models/Plans');
// const Subscription = require('../../models/Subscription');

// module.exports = unsubscribe_from_creator = async (req, res) => {
//     const { secretOrKey, stripeKeys } = require("../../config/keys");
//     const { publishable_key, secret_key } = stripeKeys
//     const stripe = require("stripe")(secret_key);

//     let creator = req.body.id;
//     console.log('creator', creator)
//     let userId = req.user._id;
//     let errors = {}
//     try {
//         Plan.findOne({ "creator_name": creator }).then(plan => {
//             let plan_id = plan.plan_id._id;
//             let plancreator = plan.creator_id;
//             stripe.subscriptions.list(
//                 { plan: plan_id },
//                 function (err, subscription) {
//                     if (err) {
//                         errors.endpoint = "unsubscribe_to_creator"
//                         errors.unsubscribe_to_creator = "failed at stripe.subscriptions.list"
//                         return res.status(500).json(errors)
//                     }
//                     Subscription.findOne(
//                         { $and: [{ "from_user": userId }, { "to_creator": plancreator }, { "active": true }] },
//                         function (err, subscription) {
//                             console.log(err)
//                             console.log(subscription)
//                             if (err) {
//                                 errors.endpoint = "unsubscribe_from_creator"
//                                 errors.unsubscribe_to_creator = "failed at Subscription.findOne"
//                                 return res.status(500).json(errors)
//                             }
//                             let subId = subscription.stripe_subscription_id;
//                             console.log('ID', subId)
//                             console.log('SUB', subscription)
//                             Subscription.findOneAndUpdate(
//                                 { "from_user": userId, "to_creator": creator },
//                                 { $set: { active: false } },
//                                 { new: true },
//                                 function (err, Subscriptions) {
//                                     console.log(err)
//                                     if (err) {
//                                         errors.endpoint = "unsubscribe_to_creator"
//                                         errors.unsubscribe_to_creator = "failed at Subscription.findOneAndUpdate"
//                                         return res.status(500).json(errors)
//                                     }
//                                     console.log(Subscriptions)
//                                     VideoLibrary.updateMany(
//                                         { $and: [{ "user": userId }, { "creator": creator }] },
//                                         { $set: { disabled: true } },
//                                         { new: true },
//                                         function (err, VideoLibrary) {
//                                             console.log('ERR', err);
//                                             if (err) {
//                                                 errors.endpoint = "unsubscribe_to_creator"
//                                                 errors.unsubscribe_to_creator = "failed at VideoLibrary.findByIdAndUpdate"
//                                                 return res.status(500).json(errors)
//                                             }
//                                             stripe.subscriptions.del(
//                                                 subId,
//                                                 function (err, confirmation) {
//                                                     console.log(err)
//                                                     if (err) {
//                                                         errors.endpoint = "unsubscribe_to_creator"
//                                                         errors.subscribe_to_creator = "failed at stripe.subscriptions.del"
//                                                         return res.status(500).json(errors)
//                                                     }
//                                                     console.log(err)
//                                                     console.log(confirmation)
//                                                     res.status(200).json({ subscribed: false })
//                                                 })
//                                         }
//                                     )
//                                 })
//                         })
//                 })
//         })
//             .catch(err => {
//                 if (err) {
//                     let errors = {}
//                     errors.endpoint = "unsubscribe_to_creator"
//                     errors.unsubscribe_to_creator = "failed at Plan.findOne"
//                     return res.status(500).json(errors)
//                 }
//             })
//     } catch (e) {
//         let errors = {}
//         errors.endpoint = "unsubscribe_to_creator"
//         errors.unsubscribe_to_creator = "failed at Plan.findOne"
//         return res.status(500).json(errors)
//     }
// }