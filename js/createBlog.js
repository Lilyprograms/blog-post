$(document).ready(function () {
  let loggedUser = localStorage.getItem("OurBlog_user");
  $("#blogBtn").click(function (e) {
    e.preventDefault();
    if (loggedUser) {
      let user_details = JSON.parse(loggedUser);
      // Creating a blog post
      $("#blogBtn").click(function (e) {
        e.preventDefault();
        // Getting data from inputs and storing in an object
        let blog_data = {
          user_id: user_details.id,
          title: $("#title").val(),
          description: $("#blog_body").val(),
          category_id: $("#category").val(),
          likes: 0,
          dislikes: 0,
          date_created: new Date().toLocaleDateString(),
        };
        // Create a blog
        $.ajax({
          url: "http://localhost:3010/blogs",
          method: "POST",
          data: JSON.stringify(blog_data),
          success: function () {
            alert("Blog created successfully");
            window.location.href = "../pages/blog.html";
          },
          error: function (err) {
            alert("Could not create blog");
            console.log(err);
          },
        });
      });
    } else {
      alert("Please Login to create a blog");
    }
  });
});
