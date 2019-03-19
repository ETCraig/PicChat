const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path');
const delegateRoutes = require('./routes/DelegateRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const DB = require('./config/Keys').mongoURI;

mongoose.set('useFindAndModify', false);
mongoose.connect(DB)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/Passport')(passport);

delegateRoutes(app);

// //Serve Static Assets in Production
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const Port = process.env.PORT || 8000;

app.listen(Port, () => console.log(`Server is working on port ${Port}.`));