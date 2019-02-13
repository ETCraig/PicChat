const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageLibrarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('image_library', ImageLibrarySchema);