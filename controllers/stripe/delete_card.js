const express = require('express');
require('dotenv').config;

module.exports = delete_user_card = async () => {
    const { stripeKeys } = require("../../config/keys");
    const { secret_key } = stripeKeys;
    const stripe = require("stripe")(secret_key);

    try {
        let cardId = req.body.card_id;
        stripe.customers.deleteCard(
            cardId,
            function(err, confirmation) {
            console.log(err);
            console.log(confirmation);
            res.status(200).json(confirmation);
        });
    }catch(e) {
        let errors = {};
        errors.videos = "failed at delete_user_card.";
        res.status(404).json(errors);
    }
}