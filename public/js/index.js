$(document).ready(function() {
  $(".navbar-default .navbar-nav .drop").click((e) => {
    console.log(1)
    let item = $(e.target).parent().find(".drop-content")
    if(item.hasClass("show-lg")) {
      item.removeClass("show-lg");
      return;
    }
    $(".show-lg").removeClass("show-lg");
    item.toggleClass("show-lg");
  });

  $(window).resize(checkSmallSize);

  $(document).click(() => {
    console.log(2)
    if ($(".navbar-collapse").hasClass("in")) {
      $(".navbar-toggle").addClass("collapsed");
      $(".navbar-toggle").attr("aria-expanded", false);
      $(".navbar-collapse").removeClass("in");
      setTimeout(() => {
        $(".show-lg").removeClass("show-lg");
      }, 200);
    }
  });

  $(".navbar-toggle").click(() => {
    console.log(3)
    setTimeout(() => {
      $(".show-lg").removeClass("show-lg");
    }, 150);
  });

  $(".navbar-collapse").click((e) => {
    console.log(4)
    e.stopPropagation();
    // return false;
  });

  $(".drop-content").click((e) => {
    console.log(5)
    e.stopPropagation();
    $(".navbar-toggle").addClass("collapsed");
    $(".navbar-toggle").attr("aria-expanded", false);
    $(".navbar-collapse").removeClass("in");
  })
});

function checkSmallSize() {
  $(".drop-content").removeClass("show-lg");
  $(".navbar-collapse").removeClass("in");
  // if ($(".trigger").css("content") === "L" ){
  //   $(".drop-content").removeClass("show-lg");
  // }
}
