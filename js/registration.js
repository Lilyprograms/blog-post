$(document).ready(function () {
  $("#btn").click(function (e) {
    e.preventDefault();
    // Getting data from inputs and storing in an object
    let user_data = {
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      gender: $("#gender").val(),
      pwd: $("#password").val(),
    };
    // Register a user
    $.ajax({
      url: "http://localhost:3010/users",
      method: "POST",
      data: JSON.stringify(user_data),
      success: function (data) {
        alert("User created successfully");
        window.location.href = "../pages/login.html";
      },
      error: function (err) {
        alert("Could not register a user");
        console.log(err);
      },
    });
  });
});
