const ImageLibrary = require('../../models/ImageLibrary');

module.exports = get_saved_images = async (req, res) => {
    let userId = req.user.id;
    console.log(userId)
    try {
        let images = await ImageLibrary.find(
            {$and: [{"user": userId}, {"disabled": false}]}
        );
        console.log('images', images)
        res.status(200).json(images);
    } catch (err) {
        let errors = {};
        errors.password = 'Failed at get_saved_images.';
        return res.status(400).json(err);
    }
}