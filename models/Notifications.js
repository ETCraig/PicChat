const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    notification: {
        type: String
    },
    checked: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: Date.now
    },
    postImage: {
        type: Array,
        default: []
    },
    comment: {
        type: String
    },
    type: {
        type: String
    },
    action: {
        type: String
    },
    reply: {
        type: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'reply'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
});

module.exports = Notification = mongoose.model('notification', NotificationSchema);