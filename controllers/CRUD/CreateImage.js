'use strict';

const Image = require('../../models/Image');

const create_image = async (req, res) => {
    try{

    }catch(err) {
        errors.password = 'Failed at Create_Image.';
        return res.status(400).json(err);
    }
}

module.exports = create_image;