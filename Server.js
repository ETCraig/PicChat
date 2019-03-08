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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const DB = require('./config/Keys').mongoURI;

mongoose.connect(DB)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/Passport')(passport);

delegateRoutes(app);

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));