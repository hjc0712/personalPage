$("#home-btn").click(function(){
    $(".home-div").removeClass("hidden");
    $(".touring-div").addClass("hidden");

    $(".nav-tabs .active").removeClass("active");
    $(".nav-tabs #home-btn").addClass("active");
});

$("#touring-btn").click(function(){
    $(".home-div").addClass("hidden");
    $(".touring-div").removeClass("hidden");

    $(".nav-tabs .active").removeClass("active");
    $(".nav-tabs #touring-btn").addClass("active");
});
