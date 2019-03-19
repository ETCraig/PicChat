const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

module.exports = {
    mongoURI: process.env.mongoURI,
    secretOrKey: process.env.secret,
    stripeKeys: JSON.parse(process.env.stripeKeys),
    AwsKeys: JSON.parse(process.env.AwsKeys),
    AwsBuckets: JSON.parse(process.env.AwsBuckets)
}