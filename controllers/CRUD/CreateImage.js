const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

module.exports = create_image = async (req, res) => {
    try{

const DB = require('../../config/Keys').mongoURI;


//Practice Gridfs Images
const conn = mongoose.createConnection(DB);

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('content');
});

const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = req.body.filename + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'content'
            }
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

const Images = require('../../models/Image');

router.get('/images', (req, res) => {
    Images.find().then(files => {
        let imageIds = files.map(function (elem) {
            return {
                image_file: elem.image_file
            }
        });
        console.log(imageIds);
        gfs.files.find().toArray((rr, files) => {
            if (!files || files.length === 0) {
                res.render('index', { files: false });
            } else {
                files.map(file => {
                    if (file.contentType === 'image/jpeg' || file.contentType === 'image.png') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });
                console.log({ files: files });
            }
        });
    });
});


            upload.array('file')
            console.log(req.files[0].id)
            const Image = new Images({
            image_file: req.files[0].id,
                // description: req.params
            });
            Image.save();
            // await upload_image_data(body)
    }catch(err) {
        errors.password = 'Failed at Create_Image.';
        return res.status(400).json(err);
    }
}