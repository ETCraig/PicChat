const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    to_creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    from_user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    expires: {
        type: Date
    },
    images: [
        {
            imag_library_item: {
                type: Schema.Types.ObjectId,
                ref: 'image_library'
            }
        }
    ],
    stripe_subscription_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);