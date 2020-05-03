const express = require('express'),
    router = express.Router(),
    path = require('path');

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: 'hjc0712@163.com',
        pass: '135798642'
    }
});




function collectLinks($){
    var allAbsoluteLinks = [];
    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function() {
        allAbsoluteLinks.push($(this).attr('href'));
    });

    return absoluteLinks.length;
}

function crawler(url, callback) {
    request(url, function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
            callback("error");
        }
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if(response.statusCode === 200) {
            // Parse the document body
            var $ = cheerio.load(body);
            console.log("Page title:  " + $('title').text());
            var links = collectLinks($);
            console.log(links);
            callback(links);    //return parameter in call back function
        }
    });
}

router.get('/', (req, res) => {
    res.render('home');
});


router.get('/crawler', (req, res) => {
    var url = "https://search.yahoo.com/search?p=seattle+condos+Zillow";
    var url2 = "https://search.yahoo.com/search?p=coronavirus+statistics";
    var url3 = "https://search.yahoo.com/search?p=javascript+crawler";
    //use call back to make sure, 'res.render' happens after crawler finishing.
    crawler(url, function (links) {   //use the returning parameter of callback function
        crawler(url2, function(links2){
            crawler(url3, function(links3){
                console.log("sss"+links+links2+links3);
                var data = "rrr"+links+links2+links3
                res.send(data);
            })
        })
    });
});



router.get('/profile',(req,res) => {
    res.render('profile/profile');
});


router.post('/', (req, res) => {
    var ejsname = req.body.name;
    var ejsemail = req.body.email;
    var ejssubject = req.body.subject;
    var ejsmessage = req.body.message;

    // console.log(req.body.name);
    var mailOptions = {
        from: 'hjc0712@163.com',
        to: 'hongjichen0712@gmail.com',
        subject: 'Contact from '+ ejsname,
        text: 'name: '+ejsname + '\n' +'email: ' + ejsemail + '\n' +'subject: ' + ejssubject + '\n' +'message: ' + ejsmessage
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.render('home');
            // $("#contactBlock").css('display','none');
        }
    });
});


module.exports = router;