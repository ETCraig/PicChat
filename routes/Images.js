const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const DB = require('../config/Keys').mongoURI;

const UPLOAD_NEW_IMAGE = require('../controllers/CRUD/CreateImage');


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

const Images = require('../models/Image');

router.post('/upload', 
    upload.any(),
    passport.authenticate('jwt', {
        session: false
    }),
    UPLOAD_NEW_IMAGE
);

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
                res.status(200).json(files);
            }
        });
    });
});


// router.post('/upload/', upload.any(), (req, res) => {
//     try{
//         let uri = req.files[0];
//         console.log('URI', uri);
//         let {description, title} = req.body;
//         console.log('BODY', description, title);
//         const Image = new Images({
//             image_file: req.files[0].id,
//             title: title,
//             description: description,
//             by_creator: req.user._id
//         });
//         Image.save();
//         res.status(200).json(req.files[0].id);
//     }catch(err) {
//         throw err;
//     }
// });

module.exports = router;