$(document).ready(function () {
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    let login_email = $("#loginEmail");
    let login_pwd = $("#loginPwd");

    if (login_email.val() == "" || login_pwd.val() == "") {
      alert("Email and Password Required");
      return;
    }
    $.ajax({
      url: "http://localhost:3010/users",
      method: "GET",
      success: function (data) {
        let checkIfUserExists = data.find((details) => details.email == login_email.val() && details.pwd == login_pwd.val());
        if (checkIfUserExists == null) {
          alert("Invalid email or password");
        } else {
          alert("User Login Successful");
          window.location.href = "../pages/blog.html";
          // Store user to Local Storage
          localStorage.setItem("OurBlog_user", JSON.stringify(checkIfUserExists));
        }
      },
      error: function (err) {
        console.log(err);
        alert("There was an error with the login");
      },
    });
  });
});
