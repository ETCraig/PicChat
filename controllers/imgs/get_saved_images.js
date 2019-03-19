const ImageLibrary = require('../../models/ImageLibrary');
const Image = require('../../models/Image');

module.exports = get_saved_images = async (req, res) => {
    let userId = req.user.id;
    let limit = req.query;
    console.log(userId)
    try {
        let images = await ImageLibrary.find(
            {$and: [{"user": userId}, {"disabled": false}]}
        );
        console.log('images', images)
        var imageArray = [];
        await images.map(function (elem) {
            imageArray.push(elem.image)
        });
        console.log(imageArray);
        let savedImages = await Image.find({"_id": imageArray})
            .sort({date: -1})
            .limit(Number(limit));
        console.log(savedImages);
        let maxLength = images.length;
        let data = {
            savedImages,
            maxLength,
            limit
        }
        res.status(200).json(data);
    } catch (err) {
        let errors = {};
        errors.password = 'Failed at get_saved_images.';
        return res.status(400).json(err);
    }
}