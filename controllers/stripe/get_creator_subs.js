// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// require('dotenv').config;

// const Plan = require('../../models/Plan');

// module.exports = get_creator_subs = (creatorID) => {
//     const { stripeKeys } = require('../../config/Keys');
//     const { publishable_key, secret_key } = stripeKeys;
//     const stripe = require('stripe')(secret_key);

//     Plan.findOne({ "creator_id": creatorID }).then(plan => {
//         let stripe_id = plan.plan_id;
//         stripe.subscriptions.list(
//             { plan: stripe_id },
//             function (err, subscriptions) {
//                 return subscriptions.data.length
//             }
//         );
//     });
// }