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
        user: 'develop_hjc@163.com',
        pass: 'hjc123456'
    }
});



// router
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/newsCrawler', (req, res) => {
    var url1 = "https://search.yahoo.com/search?p=coronavirus+statistics";
    var url2 = "https://search.yahoo.com/search?p=seattle+condos+Zillow";
    var url3 = "https://search.yahoo.com/search?p=javascript+crawler";
    var urls = [url1, url2, url3];
    var allData = [];
    var count = 0;
    //use call back to make sure, 'res.render' happens after crawler finishing.

    for (var i=0; i<3; i++) {

        crawler(urls[i], i, function (err, $, cur) {   //use the returning parameter of callback function
            if (err) {
                allData[cur] = "error";
                count++;
            }
            else {
                console.log("sss");
                allData[cur] = collectLinks($);
                count++;
                if(count >= 3) {
                    console.log(allData[0][0][0]);
                    console.log(allData[0][1][0]);
                    res.send(allData);
                }
            }
        });
    }
});

router.get('/weatherCrawler', (req, res) => {

    if(req.query) {  //call from onloading page
        var city = req.query.targetUrl;
    } else { // call from change city button
        var city = req.body.city;
    }
    var url = "https://search.yahoo.com/search?p=weather+" + city;

    //use call back to make sure, 'res.render' happens after crawler finishing.
    crawler(url, 1, function (err, $) {   //use the returning parameter of callback function
        if(err) {
            console.log("aaaaaa" + $);
            res.send("error");
        } else {
            var data = getWeather($);
            res.send(data);
        }
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
        from: 'develop_hjc@163.com',
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




// called by newsCrawler, Get the links for 'my recent interets news'
function collectLinks($){
    var allAbsoluteLinks = [];
    var allTitles = [];
    // var absoluteLinks = $("a[href^='http']");
    var results = $("#web .compTitle a[href^='http']");
    results.each(function () {
        allAbsoluteLinks.push($(this).attr('href'));
        allTitles.push($(this).text());
    });
    var res = [allAbsoluteLinks, allTitles];

    return res;
}

// called by weatherCraler, Get the data for weather
function getWeather($) {
    var condtxt = $(".wcards li .ww .condtxt").get(0); //选中了一个长度为5的ELEMENT LIST，使用 .GET(0)来获取第一个ELEMENT
    var tmpH = $(".wcards li .ww .temp .high").get(0);
    var tmpL = $(".wcards li .ww .temp .low").get(0);
    var date = $(".wcards li .day span").get(0);

    var condT = $(condtxt).text();   //use this way to select the new-generated element
    var tH = $(tmpH).text();
    var tL = $(tmpL).text();
    var dt = $(date).text();
    var weather = [condT, tH, tL, dt];
    console.log(weather);
    return weather;
}

// called by both crawler, return the document boty
function crawler(url, i, callback) {
    request(url, function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
            callback(new Error(error));
        } else {                // must need this else, js doesn't return after calling 'callback'
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if (response.statusCode === 200) {
                // Parse the document body
                var $ = cheerio.load(body);
                callback(null, $, i) //return parameter in call back function (null is the error field)
            }
        }
    });
}






module.exports = router;