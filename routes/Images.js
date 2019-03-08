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

const UPLOAD_NEW_IMAGE = require('../controllers/imgs/CreateImage');


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


router.get('/images', async (req, res) => {
    try {
        gfs.files.find().toArray((rr, files) => {
            if (!files || files.length === 0) {
                res.render('index', { files: false });
            } else {
                files.map(file => {
                    if (file.contentType === 'image/jpg' || file.contentType === 'image/png') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });
                res.status(200).json(files);
            }
        });        
    } catch (e) {
        let errors = {}
        errors.videos = "Could not find images."
        res.status(404).json(errors)
    }
})

router.get('/one/:filename', async (req, res) => {
    console.log('HIT ONE');
    console.log(req.params.filename);
    let image = await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(err, file)
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'NO FILE.' });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'NOT IMAGE' });
        }
    });
    // let data = await Images.findOne(file)
});

module.exports = router;