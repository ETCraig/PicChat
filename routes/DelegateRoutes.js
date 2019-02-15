const images = require('./Images');
const search = require('./Search');
const stripe = require('./Stripe');
const users = require('./Users');

function delegateRoutesFor(app) {
    app.use('/api/users', users)

    return app;
}

module.exports = delegateRoutesFor;