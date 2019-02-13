const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));