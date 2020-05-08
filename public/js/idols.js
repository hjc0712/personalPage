

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
                // updateNews(allData[0], 1);
                // updateNews(allData[1], 2);
                // updateNews(allData[2], 3);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});