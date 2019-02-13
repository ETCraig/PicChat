const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image_url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'Description Here.',
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    by_creator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date
    }
});

module.exports = mongoose.module('image', ImageSchema);