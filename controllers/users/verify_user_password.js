const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = verify_user_password = async (req, res) => {
    console.log(req.body)
    let {password} = req.body;
    let user = await Users.findOne({ _id: req.user.id });
    console.log(password, user.password)
    if (!user) {
        return res.status(404).json('Not Found');
    }
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) res.status(200).send(true)
            else res.status(404).json({ verify_user_password: 'Incorrect, please try again...' });
        })
        .catch(err => res.status(500).send('Catch'));
}