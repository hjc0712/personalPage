$( document ).ready(function(){
    //Perform Ajax request.

    //Ajax call 1
    weatherCrawlerAjax(globalCity);

    //Ajax call 2
    $.ajax({
        url: '/home/newsCrawler',
        type: 'get',
        success: function(allData){
            if(allData != "error") {
                globalData = allData;
                console.log(allData);
                updateNews(allData[0], 1);
                updateNews(allData[1], 2);
                updateNews(allData[2], 3);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});