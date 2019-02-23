const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const passport = require('passport');
const delegateRoutes = require('./routes/DelegateRoutes');

const Image = require('./models/Image');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const DB = require('./config/Keys').mongoURI;

mongoose.connect(DB)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

app.use(passport.initialize());


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

const Images = require('./models/Image');

app.get('/images', (req, res) => {
    console.log(req.locals.user)
    Images.find()
    .populate("fileID")
    .then(files => res.send(files))
    .catch(err => res.send(err))
  });


app.post('/upload', upload.any('file'), (req, res) => {
    const Image = new Images({
        image_file: req.files._id,
    });
    Image.save();
    res.status(200).send('true')
});


require('./config/Passport')(passport);

delegateRoutes(app);

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));