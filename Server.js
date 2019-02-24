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

const imgRoutes = require('./controllers/CRUD/CreateImage');

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


app.post('/images/upload', upload.array('file'), (req, res) => {
    console.log(req.files[0].id)
    const Image = new Images({
        image_file: req.files[0].id,
        // by_creator: req.user.id
    });
    Image.save();
    res.status(200).send('true');
});


require('./config/Passport')(passport);

delegateRoutes(app);

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));