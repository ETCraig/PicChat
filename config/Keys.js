const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});
console.log(process.env.mongoURI)
module.exports = {
    mongoURI: process.env.mongoURI,
    secretOrKey: process.env.secret,
    publishable_key: process.env.publishable_key,
    secret_key: process.env.secret_key,
    AwsBuckets: process.env.AwsBuckets, 
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
}