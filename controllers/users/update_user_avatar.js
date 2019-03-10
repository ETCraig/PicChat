const Users = require('../../models/Users');
const AWS = require('aws-sdk');
const { AwsKeys, AwsBuckets } = require('../../config/Keys');
const multer = require('multer');
const bucketName = AwsBuckets.bucketName;

var AvatarDatauri = require("datauri"),
    storage = multer.memoryStorage(),
    upload = multer({
        storage: storage
    }).any();

AWS.config.update({
    accessKeyId: AwsKeys.accessKeyId,
    secretAccessKey: AwsKeys.secretAccessKey,
    region: AwsKeys.region
});

const S3 = new AWS.S3({ useAccelerateEndpoint: true });

module.exports = update_user_avatar = async (req, res) => {
    const errors = {};
    console.log('HIT THE TRY');
    upload(req, res, async function (err) {
        try {
            console.log(req.files)
            console.log('inside')
            let uri = req.files[0];
            console.log('URI', uri)
            var datauri = new AvatarDatauri();
            datauri.format('.png', uri.buffer);
            let { mimetype } = datauri
            if (mimetype === 'image/png' || mimetype === 'image/jpg') {
                let { content } = datauri;
                buf = new Buffer(content.replace(/^data:image\/\w+;base64,/, ""), "base64");
                console.log('IN')
                let params = {
                    Bucket: bucketName,
                    Body: buf,
                    Key: `user/${req.user.id}/avatars/${Date.now()}.png`,
                    ContentType: mimetype,
                    ACL: 'public-read'
                };
                console.log('OUT')
                S3.upload(params, (err, data) => {
                    if (err) {
                        errors.endpoint = "update_user_avatar.";
                        errors.unsave_creator_image = "Failed at S3.upload().";
                        return res.status(500).json(errors);
                    }
                    Users.findOneAndUpdate(
                        { _id: req.user.id },
                        { $set: { "avatar": data.Location } },
                        { new: true }
                    ).then(user => res.status(200).json(user))
                })
            }
        } catch (err) {
            let errors = {};
            errors.password = 'Failed at Create_Image.';
            return res.status(400).json(err);
        }
    })
}