const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
let { secretOrKey } = require('../../config/Keys');
const Image = require('../../models/Image');

module.exports = get_profile_item = async (req, res) => {
    console.log('HIT the BACK')
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, secretOrKey);
            req.user = decoded;
        }
    }

    let errors = {};

    try {
        let { userid } = req.params;

        let findProfilePromise = await User.findOne(
            { _id: userid }
        ).populate('user', [
            'avatar',
            'user_name',
            'handle',
        ]);

        // const findImagesPromise = await Image.find({ by_creator: userid }).countDocuments();
        
        // const [foundProfile, imageCount] = await Promise.all([findProfilePromise, findImagesPromise]);
        console.log('GOING TO DATA')
        let data = {
            ...findProfilePromise._doc,
            subscribed: false,
            subscribedYou: false,
            // imageCount,
            isMe: false
        }
        console.log(data)
        if (req.user) {
            if (userid === req.user.id.toString()) {
                data.isMe = true;
            }
        }

        // if (followingIDS.includes(userid)) {
        //     data.followed = true
        // }

        res.status(200).json(data);
    } catch (err) {
        errors.endpoint = "get_profile_item"
        errors.get_sources = "Could not get items."
        res.status(500).json(errors)
    }
}