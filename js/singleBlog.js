$(document).ready(function () {
  // Get Logged user From Local Storage
  let loggedUser = localStorage.getItem("OurBlog_user");
  let user_details = JSON.parse(loggedUser);

  // Get id from URL
  let myUrl = window.location.search;
  let id = new URLSearchParams(myUrl).get("id");
  $.ajax({
    url: `http://localhost:3010/blogs/${id}`,
    method: "GET",
    success: function (data) {
      let output = `
      <div class="post">
        <h4 class="post_heading">${data.user_name}. ${data.date_created}</h4>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <div class="post_bottom">
            <div class="post_like">
                <img src="../images/like.png" alt="Likes" />
            <p>${data.likes}</p>
            </div>
            <div class="post_dislike">
                <img src="../images/dislike.png" alt="Dislikes" />
                <p>${data.dislikes}</p>
            </div>
        </div>
        ${user_details.id == data.user_id ? "<button id='deleteBlog'>Delete</button>" : ""}
    </div>
      `;
      $("#postContainer").html(output);
      $("#deleteBlog").click(deleteBlog);
    },
    error: function (err) {
      console.log(err);
    },
  });

  //   Making a comment
  $("#commentBtn").click(function (e) {
    e.preventDefault();
    if (loggedUser) {
      if ($("#commentInput").val() == "") {
        alert("Add a comment");
        return;
      }
      let commentData = {
        user_id: user_details.id,
        user_name: user_details.first_name + " " + user_details.last_name,
        body: $("#commentInput").val(),
        post_id: id,
        date_commented: new Date().toLocaleDateString(),
      };
      $.ajax({
        url: "http://localhost:3010/comments",
        method: "POST",
        data: JSON.stringify(commentData),
        success: function () {
          alert("Comment successfully made");
          getComments();
        },
        error: function (err) {
          alert("Operation could not be completed");
          console.log(err);
        },
      });
    } else {
      alert("You have to be logged in to make a comment");
    }
  });

  //   Getting All Comments
  function getComments() {
    $.ajax({
      url: `http://localhost:3010/comments?post_id=${id}`,
      method: "GET",
      success: function (data) {
        $("#numberOfComments").html(data.length);
        if (data.length <= 0) {
          $("#commentBody").html("<p>Be the first to comment...</p>");
        } else {
          let output = "";
          $(data).each(function (index, comment) {
            output += `
            <div class="comment_content">
                <h4 class="post_heading">${comment.user_name} . ${comment.date_commented}</h4>
                <p>${comment.body}</p>
          </div>
            `;
          });
          $("#commentBody").html(output);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
  getComments();

  //   Delete a Blog
  function deleteBlog() {
    $.ajax({
      url: `http://localhost:3010/blogs/${id}`,
      method: "DELETE",
      success: function () {
        alert("Post Deleted");
        window.location.href = "../pages/blog.html";
      },
      error: function (err) {
        alert("Could Not Delete Post");
        console.log(err);
      },
    });
  }
});
