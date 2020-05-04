// Ajax call for web crawler
$( document ).ready(function(){
    //Perform Ajax request.
    $.ajax({
        url: '/home/crawler',
        type: 'get',
        success: function(allData){
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
    var title = news[1][0];
    var url = news[0][0];

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
    var selector = "#no"+number+" p";
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
        $(".mainCol").css("margin-left","0px");
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
        $(".mainCol").css("margin-left","100px");
    },1000);
})

