const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const delegateRoutes = require('./routes/DelegateRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/Keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

delegateRoutes(app);

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));