const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

//GET
router.get('/', function (req, res, next) {
    console.log('--- Ruta GET /chat ---');
    console.log(process.env.API_KEY);
    res.render('chat', { title: 'Chat' });
}
);

module.exports = router;   