var musicCrawlerDone = false;
var movieCrawlerDone = false;

$( document ).ready(function(){
    //Perform Ajax request.

    //Ajax call 2
    AjaxGetIdolNews(["steph+curry+news", "steve+nash+news", "kaka+news"], "sport");

});


$("#sport-btn").click(function(){
    $("#sport-div").removeClass("hidden");
    $("#movie-div").addClass("hidden");
    $("#music-div").addClass("hidden");

    $(".nav-tabs .active").removeClass("active");
    $(".nav-tabs #sport-btn").addClass("active");
});

$("#music-btn").click(function(){
    $("#sport-div").addClass("hidden");
    $("#movie-div").addClass("hidden");
    $("#music-div").removeClass("hidden");

    $(".nav-tabs .active").removeClass("active");
    $(".nav-tabs #music-btn").addClass("active");

    //Ajax call 2
    if (!musicCrawlerDone) {
        musicCrawlerDone = true;
        AjaxGetIdolNews(["JJ+Lin+news", "Tia+ray+singer", "Taylor+swift+news"], "music");
    }
});

$("#movie-btn").click(function(){
    $("#sport-div").addClass("hidden");
    $("#music-div").addClass("hidden");
    $("#movie-div").removeClass("hidden");

    $(".nav-tabs .active").removeClass("active");
    $(".nav-tabs #movie-btn").addClass("active");

    //Ajax call 2
    if (!movieCrawlerDone) {
        movieCrawlerDone = true;
        AjaxGetIdolNews(["Janine+Chang+news", "Natalie+Portman+news"], "movie");
    }
});




function AjaxGetIdolNews(queryList, category){

    $.ajax({
        url: '/idols/getIdolNews',
        type: 'get',
        data: {
            name : queryList
        },
        success: function(allData){
            if(allData != "error") {
                console.log(allData);
                updateIdolNews(allData[0], 0, category, function(){
                    updateIdolNews(allData[1], 1, category, function(){
                        updateIdolNews(allData[2], 2, category, function(){});
                    });
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
}

function updateIdolNews(data, index, category, callback) {
    var titles = data[1];
    var urls = data[0];

    var template = $(".news-template").clone();  // must clone, or everything done afterwards will impacted the original element
    template.attr("class", "");

    // template.removeClass(".news-template");  // This somehow not working, just not removing...
    // template.removeClass("hidden");



    for (var i = 0; i < 3; i++){
        var a = document.createElement('a');
        var text = document.createTextNode(titles[i]);
        a.appendChild(text);
        a.href = urls[0];

        var selector = i;
        $(template).children().get(i).append(a);
    }

    var idolSelector = "#" + category + "-div #idol" + index;
    $(idolSelector + " .idol-news").html(template);
    callback();

}