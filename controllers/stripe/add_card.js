const express = require("express");

module.exports = add_card_to_stripe = async (req, res) => {
  const { stripeKeys } = require("../../config/keys");
  const { secret_key } = stripeKeys;
  const stripe = require("stripe")(secret_key);

  try {
    let { customer, tokenId } = req.body;

    const addCardToStripeAccount = await stripe.customers.createSource(
      customer,
      { source: tokenId },
      function(err, card) {
        if (err) {
          return res.status(500).json("failed to add card to existing account");
        }
        console.log(card);
        return res.status(200).json(card);
      }
    );
  } catch (e) {
    res.status(500).json("no");
  }
};
