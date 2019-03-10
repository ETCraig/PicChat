const Receipts = require('../../models/Receipts');

module.exports = get_receipts_list = async (req, res) => {
    let limit = req.query;
    let user = req.user._id;
    try {
        let maxLength = await Receipts.find({"user": user}).countDocuments();
        console.log('MAX', maxLength);
        let receipt = await Receipts.find({"user": user}).populate(
            'user', [
                'amount',
                'currency',
                'receipt_url',
                'time'
            ]
        )
        .sort({date: -1})
        .limit(Number(limit));

        let data = {
            receipt,
            maxLength,
            limit
        }
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        let errors = {}
        errors.endpoint = "get_receipts_list."
        errors.get_sources = "Could not get receipts."
        res.status(500).json(errors)
    }
}