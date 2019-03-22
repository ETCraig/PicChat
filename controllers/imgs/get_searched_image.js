const Image = require('../../models/Image');
const User = require('../../models/Users');
const Subscriptions = require('../../models/Subscription');
const ImageLibrary = require('../../models/ImageLibrary');

module.exports = get_searched_image = async (req, res) => {
    let errors = {};
    console.log(req.params._id)
    let imageid = req.params._id;
    console.log('IFUKINDS', imageid)
    try{
        console.log('HIT')
        const image = await Image.findOne({_id: imageid}, {
            comments: 0,
            modified: 0
        }).populate('by_creator', ['avatar', 'user_name', 'handle', 'verified'])
        console.log('IMAGES', image)
        let data = {
            ...image._doc,
        }
        console.log('D', data)
        data.dislikes = image.dislikes.length || 0
        data.likes = image.likes.length || 0

        res.status(200).json(data);
    } catch (e) {
        let errors = {}
        errors.search = "failed at get_searched_image."
        res.status(404).json(errors)
    }
}