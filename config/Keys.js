const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

module.exports = {
    mongoURI: JSON.parse(process.env.mongoURI),
    secretOrKey: JSON.parse(process.env.secrets),
    stripeKeys: JSON.parse(process.env.stripeKeys),
    AwsKeys: JSON.parse(process.env.AwsKeys),
    AwsBuckets: JSON.parse(process.env.AwsBuckets)
}