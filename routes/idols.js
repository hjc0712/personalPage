const express = require('express'),
    router = express.Router(),
    path = require('path');

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


// Routers
router.get('/', (req, res) => {
    res.render('idols/idols');
});

router.get('/getIdolNews', (req, res) => {
    var names = req.query.name;
    var allData = [];
    var urls = [];
    var count = 0;

    for(var i=0; i < names.length; i++){
        urls.push("https://search.yahoo.com/search?p=" + names[i]);
    }

    for (var i=0; i < names.length; i++){  // the crawlers in for loop are executed asyc
        var url = "https://search.yahoo.com/search?p=" + names[i];

        crawler(url, i,  function (err, $, cur) { // i will change as for loop goes, pass the current i and callback the same number to store current index
            if(err) {
                console.log("aaaaaa" + $);
                allData[0] = "error";
                count++;
            } else {
                var data = getIdolNews($);
                allData[cur] = data;   //At the moment here is reached, for loop has goes to the end(since async), so need a index
                count++;
                console.log("count=",count);
                if(count >= names.length){  //only send data back when all crawlers finished
                    res.send(allData);
                }
            }
        });
    }
});


//JS functions
function multiCrawler(urls, callback) {
    var allData = [0,0,0];
    var count = 0;

    for (var i=0; i < urls.length; i++){
        var url = urls[i];
        //use call back to make sure, 'res.render' happens after crawler finishing.
        crawler(url, function (err, $) {   //use the returning parameter of callback function
            if(err) {
                console.log("aaaaaa" + $);
                allData[0] = "error";
                count++;
            } else {
                var data = getIdolNews($);
                allData[i] = data;
                count++;
                console.log("count=",count);
            }
        });
    }

}

function crawler(url, cur, callback) {
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
                console.log("Page title:  " + $('title').text());
                callback(null, $, cur) //return parameter in call back function (null is the error field)
            }
        }
    });
}

function getIdolNews($){
    var allAbsoluteLinks = [];
    var allTitles = [];
    // var absoluteLinks = $("a[href^='http']");
    var results = $(".compTitle a[href^='http']");
    results.each(function () {
        allAbsoluteLinks.push($(this).attr('href'));
        allTitles.push($(this).text());
    });
    var res = [allAbsoluteLinks.slice(0,3), allTitles.slice(0,3)];

    return res;
}

module.exports = router;