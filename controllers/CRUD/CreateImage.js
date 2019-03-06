const Image = require('../../models/Image');

module.exports = create_image = async (req, res) => {
        try {
        const Images = require('../../models/Image');
        let uri = req.files[0];
        console.log('URI', uri);
        let { description, title } = req.body;
        console.log('BODY', description, title);
        const Image = new Images({
            image_file: req.files[0].id,
            title: title,
            description: description,
            by_creator: req.user._id
        });
        Image.save();
        res.status(200).json(req.files[0].id);
    } catch (err) {
        errors.password = 'Failed at Create_Image.';
        return res.status(400).json(err);
    }
}