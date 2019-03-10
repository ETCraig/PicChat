const Image = require('../../models/Image');

module.exports = like_creator_image = async (req, res) => {
    let errors = {};
    let userId = req.user._id;
    let imageId = req.params.image_id;
    try {
        let image = await Image.findById(imageId);

        let dislikeExists = await image.dislikes.find(
            item => item.user == `${req.user.id}`
        );

        if (dislikeExists) {
            if (dislikeExists.user.toString() === req.user.id) {
                let removeLike = image.dislikes.filter(function (obj) {
                    return obj.user.toString() !== `${req.user.id}`;
                });
                image.dislikes = removeLike;
            }
        }

        let likeExists = await image.likes.find(
            item => item.user == `${req.user.id}`
        );
        console.log(likeExists)
        if (likeExists) {
            if (likeExists.user.toString() === req.user.id) {
                let removeLike = image.likes.filter(function (obj) {
                    return obj.user.toString() !== `${req.user.id}`;
                });
                image.likes = removeLike;
            }
        } else {
            image.likes.unshift({ user: req.user.id });
        }
        image.modified = Date.now();
        image.save().then(image => {
            let data = {
                likeCount: image.likes.length,
                dislikeCount: image.dislikes.length,
                liked: false,
                disliked: false
            }
            image.likes.find(elem => {
                if (elem.user.toString() === userId.toString()) {
                    data.liked = true
                }
            });
            image.dislikes.find(elem => {
                if (elem.user.toString() === userId.toString()) {
                    data.disliked = true
                }
            });
            res.status(200).json(data);
        })
    } catch (e) {
        errors.endpoint = "like_creator_image."
        errors.save_coach_video = "Could not like this image at this time."
        res.status(500).json(errors)
    }
}