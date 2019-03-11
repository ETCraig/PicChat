const Image = require('../../models/Image');
const Subscriptions = require('../../models/Subscription');

module.exports = get_feed_images = async (req, res) => {
    let limit = req.query;
    let user = req.user._id;
    try {
        console.log('USER', user)
        let subscriptions = await Subscriptions.find({ "from_user": user });
        console.log(subscriptions);
        var creatorArray = [];
        await subscriptions.map(function (elem) {
            creatorArray.push(elem.to_creator)
        });
        console.log(creatorArray)
        let feedImages = await Image.find({ "by_creator": creatorArray })
            .sort({ date: -1 })
            .limit(Number(limit));
        console.log('IMAGES', images)
        let maxLength = images.length;
        console.log('LENGTH', maxLength)
        let data = {
            feedImages,
            maxLength,
            limit
        }
        res.status(200).json(data);
    } catch (e) {
        let errors = {}
        errors.endpoint = "get_feed_images."
        errors.save_creator_image = "Could not load these images at this time."
        res.status(500).json(errors)
    }
}