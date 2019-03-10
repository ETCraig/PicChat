const Image = require('../../models/Image');
const User = require('../../models/Users');
const Subscriptions = require('../../models/Subscription');
const ImageLibrary = require('../../models/ImageLibrary');

module.exports = get_single_image = async (req, res) => {
    console.log(req.params)
    let userId = req.user._id;
    let imageId = req.params.image_id;
    console.log(userId, imageId);
    try {
        const findImage = await Image.findById(imageId);

        const findCreator = await User.findById(findImage.by_creator);

        let [image, creator] = await Promise.all([findImage, findCreator]);
        console.log(image, creator);
        let data = {
            image: image,
            creator: creator,
            likeCount: image.likes.length ? image.likes.length : 0,
            dislikeCount: image.dislikes.length ? image.dislikes.length : 0,
            liked: false,
            disliked: false,
            isSaved: false,
            isSubscribed: false
        }
        console.log('DATA', data);
        let creatorId = data.creator._id;
        console.log('CREATOR', creatorId)
        const findSubscription = await Subscriptions.findOne({
            "from_user": userId, 
            "to_creator": creatorId,
            "active": true
        });
        const findSavedImage = await ImageLibrary.findOne({
            "user": userId, 
            "image": imageId
        });
        let [subId, imageSaved] = await Promise.all([findSubscription, findSavedImage]);
        console.log('FINDS', subId, imageSaved);
        if(req.user) {
            image.likes.find(elem => {
                if(elem.user.toString() === userId.toString()) {
                    data.liked = true
                }
            });
            image.dislikes.find(elem => {
                if(elem.user.toString() === userId.toString()) {
                    data.disliked = true
                }
            });
            if(imageSaved) {
                data.isSaved = true
            }
            if(subId.length !== 0) {
                data.isSubscribed = true
            }
        }
        console.log(data)
        res.status(200).json(data);
    } catch (e) {
        let errors = {}
        errors.endpoint = "get_single_image."
        errors.save_creator_image = "Could not load this image at this time."
        res.status(500).json(errors)
    }
}