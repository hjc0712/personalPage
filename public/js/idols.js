

$( document ).ready(function(){
    //Perform Ajax request.


    //Ajax call 2
    $.ajax({
        url: '/idols/getIdolNews',
        type: 'get',
        data: {
            name : ["steph+curry+news", "steve+nash+news", "kaka+news"]
        },
        success: function(allData){
            if(allData != "error") {
                console.log(allData);
                updateIdolNews(allData[0], 0, function(){
                    updateIdolNews(allData[1], 1, function(){
                        updateIdolNews(allData[2], 2, function(){});
                    });
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});


function updateIdolNews(data, index, callback) {
    var titles = data[1];
    var urls = data[0];

    // var templateHolder = document.createElement('div');
    // $(templateHolder).addClass("tempHolder");
    //
    // var template = $(".news-template div"); // get the template
    // template.each(function(){
    //     $(templateHolder).append(this);
    // })

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

    var idolSelector = "#idol" + index;
    $(idolSelector + " .idol-news").html(template);
    callback();

}