const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path');
const delegateRoutes = require('./routes/DelegateRoutes');
require("dotenv").config({
    path: path.join(__dirname, "./.env")
});
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const DB = process.env.mongoURI;
console.log(DB)
mongoose.set('useFindAndModify', false);
mongoose.connect(DB)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/Passport')(passport);

delegateRoutes(app);

// //Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));