const express = require('express');
const router = express.Router();
const passport = require('passport');

module.exports = upload_image_data = async () => {
    try{
        console.log(req.params)
        Images.find({"image_file": req.params});
    }catch(e) {
        let errors = {};
        errors.videos = "failed at upload_image_data.";
        res.status(404).json(errors);
    }
}