const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config;

const Plan = require('../../models/Plan');

const Subscriptions = require('../../models/Subscription');

module.exports = subscribe_to_coach = async (req, res) => {
    const {stripeKeys} = require('../../config/Keys');
    const {publishable_key, secret_key} = stripeKeys;
    const stripe = require('stripe')(secret_key);

    try{
        
    }catch(err) {
        return res.status(500).json(err)
    }
}