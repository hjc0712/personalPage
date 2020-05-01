$(document).ready(() => {
  $("#full-time-btn").click(() => {
    $("#full-time").removeClass("hidden-tabs");
    $("#internship").addClass("hidden-tabs");
    $("#full-time-btn").addClass("active");
    $("#internship-btn").removeClass("active");
  });

  $("#internship-btn").click(() => {
    $("#full-time").addClass("hidden-tabs");
    $("#internship").removeClass("hidden-tabs");
    $("#full-time-btn").removeClass("active");
    $("#internship-btn").addClass("active");
  });
});