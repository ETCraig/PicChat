const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const CREATE_IMAGE = require('../controllers/CRUD/CreateImage');

const DB = require('../config/Keys').mongoURI;

const conn = mongoose.createConnection(DB);

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('content');
});

const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
        console.log('HIT')
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

router.post('/images/upload', upload.any('file'), (req, res) => {
    console.log('HIT Through')
    const Image = new Images({
        image_file: req.files._id,
        title: 'tjhkejsdfn'
    });
    Image.save();
    res.status(200).send('true')
});

module.exports = router;