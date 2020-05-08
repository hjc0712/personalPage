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



// router
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/newsCrawler', (req, res) => {
    var url1 = "https://search.yahoo.com/search?p=coronavirus+statistics";
    var url2 = "https://search.yahoo.com/search?p=seattle+condos+Zillow";
    var url3 = "https://search.yahoo.com/search?p=javascript+crawler";
    //use call back to make sure, 'res.render' happens after crawler finishing.
    crawler(url1, function (err, $1) {   //use the returning parameter of callback function
        if(err) {res.send("error");}
        else {
            crawler(url2, function (err, $2) {
                if(err) {res.send("error");}
                else {
                    crawler(url3, function (err, $3) {
                        if(err) {res.send("error");}
                        else {
                            console.log("sss");
                            var data1 = collectLinks($1);
                            var data2 = collectLinks($2);
                            var data3 = collectLinks($3);
                            console.log(data1[0][0]);
                            console.log(data1[1][0]);
                            var allData = [data1, data2, data3];
                            res.send(allData);
                        }
                    })
                }
            })
        }
    });
});

router.get('/weatherCrawler', (req, res) => {

    if(req.query) {  //call from onloading page
        var city = req.query.targetUrl;
    } else { // call from change city button
        var city = req.body.city;
    }
    var url = "https://search.yahoo.com/search?p=weather+" + city;

    //use call back to make sure, 'res.render' happens after crawler finishing.
    crawler(url, function (err, $) {   //use the returning parameter of callback function
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
function crawler(url, callback) {
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
                callback(null, $) //return parameter in call back function (null is the error field)
            }
        }
    });
}






module.exports = router;