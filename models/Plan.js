const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlansSchema = new Schema({
    creator_id: {
        type: String,
        required: true
    },
    plan_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    }
});

module.exports = Plan = mongoose.model('plans', PlansSchema);