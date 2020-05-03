
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

// Ajax call for web crawler
$( document ).ready(function(){
    //Perform Ajax request.
    $.ajax({
        url: '/home/crawler',
        type: 'get',
        success: function(data){
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
        }
    });
});
