const Image = require('../../models/Image');
const Subscriptions = require('../../models/Subscription');

module.exports = get_feed_images = async (req, res) => {
    let user = req.user._id;
    try {
        console.log('USER', user)
        let subscriptions = await Subscriptions.find({"from_user": user});
        console.log(subscriptions);
        var creatorArray = [];
        await subscriptions.map(function (elem) {
            creatorArray.push(elem.to_creator)
        });
        console.log(creatorArray)
        let images = await Image.find({"by_creator": creatorArray});
        console.log(images)
        res.status(200).json(images);
    } catch (e) {
        let errors = {}
        errors.endpoint = "get_feed_images."
        errors.save_creator_image = "Could not load these images at this time."
        res.status(500).json(errors)
    }
}