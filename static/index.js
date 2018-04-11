/**
 * Grabs data from the text box and sends the data to the web service
 */
function postData() {
  var userName = $("#user-input").val();
  var postData = JSON.stringify({ user: userName });

  $.ajax({
    url: "http://localhost:3000/users",
    type: "post",
    contentType: "application/json",
    data: postData,
    success: function() {
      console.log("success");
    }
  });
}

/**
 * pulls data grom the webservice.  Generates new divs for each user at the end of the document
 */
function getUsers() {
  $.ajax({
    url: "http://localhost:3000/users",
    type: "get",
    success: function(data) {
      data.forEach(element => {
        $("section").append("<div>" + element.user + "</div>");
      });
    }
  });
}

/**
 * on page load, jquery pull the data and populates the page
 */
$(document).ready(function() {
  getUsers();
});
