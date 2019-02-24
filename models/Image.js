const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image_file: {
        type: Schema.Types.ObjectId,
        ref: "content.files"
    },
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        default: 'Description Here.'
        // required: true
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
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
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

module.exports = images = mongoose.model('images', ImageSchema);