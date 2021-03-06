const Subscriptions = require('../../models/Subscription');
const Image = require('../../models/Image');
const ImageLibrary = require('../../models/ImageLibrary');

module.exports = save_creator_image = async (req, res) => {
    let imageID = req.params.image_id;
    let user = req.user._id;
    console.log(imageID, user);
    try {
        let findCreator = await Image.findById(imageID);
        console.log(findCreator);
        let creator = findCreator.by_creator;
        console.log(creator);
        let subscription = await Subscriptions.findOne(
            { "to_creator": creator, "from_user": user, active: true }
        );
        console.log(subscription);

        let newImageLibrary = new ImageLibrary({
            user: user,
            image: imageID,
            creator: creator
        });

        newImageLibrary.save()
            .then(library_item => {
                subscription.images.unshift({
                    image_library_item: imageID
                });
                subscription.save()
                    .then(subscription_item => {
                        res.status(200).json({ isSaved: true });
                    })
                    .catch(err => {
                        errors = {};
                        errors.endpoint = "save_creator_image.";
                        errors.save_creator_image = "Failed at subscription.save().";
                        res.status(500).json(errors);
                    });
            })
            .catch(err => {
                errors = {};
                errors.endpoint = "save_creator_image.";
                errors.save_creator_image = "Failed at newImageLibrary.save().";
                res.status(500).json(errors);

            })
    } catch (e) {
        let errors = {}
        errors.endpoint = "save_creator_image."
        errors.save_creator_image = "Could not save this image at this time."
        res.status(500).json(errors)
    }
}