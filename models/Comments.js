const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    modified_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comments = mongoose.model("comments", CommentsSchema);