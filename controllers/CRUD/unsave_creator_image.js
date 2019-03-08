const Subscriptions = require('../../models/Subscription');
const ImageLibrary = require('../../models/ImageLibrary');

module.exports = unsave_creator_image = async (req, res) => {
    let imageID = {};
    let user = req.user._id;
    let creator = req.body.creatorId;
    console.log(imageID, user, creator);
    try {
        ImageLibrary.findOneAndDelete(
            { $and: [{ "user": user }, { "image": imageID }] },
            function (err, Image) {
                if (err) {
                    let errors = {};
                    errors.endpoint = "unsave_creator_image.";
                    errors.unsave_creator_image = "Failed at ImageLibrary.findOneAndDelete().";
                    return res.status(500).json(errors);
                }
                console.log(err, Image);
                Subscriptions.update(
                    { $and: [{ "to_creator": creator }, { "from_user": user }, { "active": true }] },
                    { $pull: { "images": { image_library_item: imageID } } },
                    function (err, Subscription) {
                        if (err) {
                            let errors = {};
                            errors.endpoint = "unsave_creator_image.";
                            errors.unsave_creator_image = "Failed at Subscriptions.update().";
                            return res.status(500).json(errors);
                        }
                        console.log(Subscription);
                        res.status(200).json({ isSaved: false });
                    }
                )
            }
        )
    } catch (e) {
        let errors = {}
        errors.endpoint = "unsave_creator_image."
        errors.save_coach_video = "Could not unsave this image at this time."
        res.status(500).json(errors)
    }
}