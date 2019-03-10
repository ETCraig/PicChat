const Image = require('../../models/Image');

module.exports = get_feed_images = async (req, res) => {
    try{
        const images = await Image.find();
        console.log(images);
        res.status(200).json(images);
    } catch (e) {
        let errors = {}
        errors.endpoint = "get_feed_images."
        errors.save_creator_image = "Could not load these images at this time."
        res.status(500).json(errors)
    }
}