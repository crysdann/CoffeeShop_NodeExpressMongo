/*!
 * Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
 */
// Highlights current date on contact page
// window.addEventListener('DOMContentLoaded', event => {
//     const listHoursArray = document.body.querySelectorAll('.list-hours li');
//     listHoursArray[new Date().getDay()].classList.add(('today'));
// })

$(document).ready(() => {
  $("#sendMessageButton").click(() => {
    // fetch values
    const title = $("#title").val().trim();
    const description = $("#description").val().trim();
    const username = $("#username").val().trim();

    // initilialize the span tags
    $("#spantitle").text("");
    $("#spandescription").text("");
    $("#spanusername").text("");

    let isValid = true;

    if (title == "") {
      $("#spantitle").text("Title cannot be empty");
      isValid = false;
    }
    if (description == "") {
      $("#spandescription").text("Description cannot be empty");
      isValid = false;
    }
    if (username == "") {
      $("#spanusername").text("Username cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      return false;
    }
  });
});
