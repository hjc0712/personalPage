const express = require('express'),
    router = express.Router(),
    path = require('path');

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


// Routers
router.get('/', (req, res) => {
    res.render('journeys/journeys');
});



module.exports = router;