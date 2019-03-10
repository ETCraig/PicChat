const Image = require('../../models/Image');

const AWS = require('aws-sdk');
const multer = require('multer');
const { AwsKeys, AwsBuckets } = require('../../config/Keys');

const bucketName = AwsBuckets.bucketName;
var ImageDatauri = require('datauri'),
    storage = multer.memoryStorage(),
    upload = multer({ storage: storage }).any();

AWS.config.update({
    accessKeyId: AwsKeys.accessKeyId,
    secretAccessKey: AwsKeys.secretAccessKey,
    region: AwsKeys.region
});

const S3 = new AWS.S3({ useAccelerateEndpoint: true });

module.exports = create_image = async (req, res) => {
    const published = Date.now();
    upload(req, res, async function (err) {
        try {
            console.log('Hit the Inside.')
            let uri = req.files[0];
            let { description, title, tags } = req.body;
            console.log('URI', uri)
            var datauri = new ImageDatauri();
            datauri.format('.png', uri.buffer);
            let { mimetype } = datauri;
            if (mimetype === 'image/png' || mimetype === 'image/jpg') {
                let { content } = datauri;
                buf = new Buffer(content.replace(/^data:image\/\w+;base64,/, ""), "base64");
                let params = {
                    Bucket: bucketName,
                    Body: buf,
                    Key: `user/${req.user.id}/images/${Date.now()}.png`,
                    ContentType: mimetype,
                    ACL: 'public-read'
                };
                S3.upload(params, (err, data) => {
                    console.log('ERR', err);
                    console.log('DATA', data)
                    console.log(data.Location)
                    let imageFields = {
                        image_file: data.Location,
                        title: title,
                        description: description,
                        tags: [],
                        by_creator: req.user._id
                    }
                    if (tags && tags.length) tags.forEach(tag => imageFields.tags.push(tag));
                    let newImage = new Image(imageFields);
                    newImage.save().then(image => {
                        res.status(200).json(image);
                    })
                })
            } else {
                let errors = {};
                errors.video = "Please upload a image that's a .png or .jpg"
                res.status(404).json(errors)
            }
        } catch (err) {
            let errors = {};
            errors.password = 'Failed at Create_Image.';
            return res.status(400).json(err);
        }
    })
}




// module.exports = create_image = async (req, res) => {
//         try {
//         const Images = require('../../models/Image');
//         let uri = req.files[0];
//         console.log('URI', uri);
//         let { description, title } = req.body;
//         console.log('BODY', description, title);
//         const Image = new Images({
//             image_file: req.files[0].id,
//             title: title,
//             description: description,
//             by_creator: req.user._id
//         });
//         Image.save();
//         res.status(200).json(req.files[0].id);
//     } catch (err) {
//         errors.password = 'Failed at Create_Image.';
//         return res.status(400).json(err);
//     }
// }