
var newsCount = [0,0,0];
var globalData = [];

// Ajax call for web crawler
// Ajax call for web crawler
$( document ).ready(function(){
    //Perform Ajax request.
    $.ajax({
        url: '/home/weatherCrawler',
        type: 'get',
        data: {
            targetUrl:"https://search.yahoo.com/search?p=weather+seattle"
        },
        success: function(data){

        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});

$( document ).ready(function(){
    //Perform Ajax request.
    $.ajax({
        url: '/home/crawler',
        type: 'get',
        success: function(allData){
            globalData = allData;
            updateNews(allData[0], 1);
            updateNews(allData[1], 2);
            updateNews(allData[2], 3);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});


function updateNews (news, number){

    var index = (newsCount[number-1]) % (globalData[number-1][0].length);
    var title = news[1][index]; //
    var url = news[0][index];

    // title for the news link
    var a = document.createElement('a');
    var text = document.createTextNode(title);
    a.appendChild(text);
    a.title = title;
    a.href = url;
    var selector = "#no"+number+" span";
    $(selector).html(a);

    //url for the news link
    var a2 = document.createElement('a');
    var urlcut = url.slice(0,25) +"...";
    var text = document.createTextNode(urlcut);
    a2.appendChild(text);
    a2.title = url;
    a2.href = url;
    var selector = "#no"+number+" .link p";
    $(selector).html(a2);
}


// left side colunm events
$(".hideBt").click(() =>{
    console.log("h");
    //
    $(".leftCol").css("animation","1.1s leftColSlideout 0s");
    $(".mainCol").css("animation","1.1s mainColSlideout 0s");
    $(".hideBt").css("display","none");
    $(".showBt").css("display","inline");
    setTimeout(function(){
        $(".leftCol").css("display","none");
        if($("body").width() < 1100) {
            $(".mainCol").css("margin-left", "0px");
        }else {
            $(".mainCol").css("margin-left", "50px");
        }
    },1000);
})

$(".showBt").click(() =>{
    console.log("s");
    $(".leftCol").css("animation","1.1s leftColSlidein 0s");
    $(".mainCol").css("animation","1.1s mainColSlidein 0s");
    $(".leftCol").css("display","inline");
    $(".showBt").css("display","none");
    setTimeout(function(){
        $(".leftCol").css("display","inline");
        $(".hideBt").css("display","inline");
        if($("body").width() < 1350) {
            $(".mainCol").css("margin-left", "100px");
        } else {
            $(".mainCol").css("margin-left", "250px");
        }
    },1000);
})

// More news button
$(".news #no1 button").click(() => {
    newsCount[0] ++;
    updateNews(globalData[0], 1);
})

$(".news #no2 button").click(() => {
    newsCount[1] ++;
    updateNews(globalData[1], 2);
})

$(".news #no3 button").click(() => {
    newsCount[2] ++;
    updateNews(globalData[2], 3);
})