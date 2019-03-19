const Users = require('../../models/Users');
const Image = require('../../models/Image');

module.exports = get_search_query = async (req, res) => {
    let { q, limit, nousers, noimages } = req.query;
    try {
        let itemsToReturn = [];

        if (!nousers) {
            let users = await Users.find(
                { $or: [{ user_name: { $regex: new RegExp(q, 'i', 'g') } }, { handle: { $regex: new RegExp(q, 'i', 'g') } }] }, {
                    first_name: 0,
                    last_name: 0,
                    email: 0,
                    password: 0,
                    date: 0
                }
            )
                .limit(Number(limit))
                .sort({
                    date: -1,
                    user_name: -1
                });
            if (users) {
                users.forEach(({ user_name, _id, avatar, handle }, index) => { itemsToReturn.push({ type: 'user', search_string: `${full_name}${handle}`, handle, user_name, _id, avatar }) })
            }
        }

        if (!noimages) {
            let images = await Image.find(
                { $or: [{ title: { $regex: new RegExp(q, 'i', 'g') } }, { description: { $regex: new RegExp(q, 'i', 'g') } }] }, {

                }
            )
                .populate('by_creator', ['avatar', 'handle', 'user_name'])
                .limit(Number(limit))
            if (images.length > 0) {
                images.forEach(({ _id, tags, description, title, likes, dislikes }, index) => { itemsToReturn.push({ type: 'image', _id, search_string: `${title}${description}${tags.map(tag => tag)}`, title }) })
            }
        }
        itemsToReturn.sort((a, b) => {
            return a.search_string - b.search_string
        })
        itemsToReturn.forEach(item => delete item.search_string);

        res.status(200).json(itemsToReturn);
    } catch (e) {
        let errors = {}
        errors.search = "failed at get_search_query."
        res.status(404).json(errors)
    }
}