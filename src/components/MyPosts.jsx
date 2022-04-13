import React, { useState } from "react";

const MyPosts = () => {
  const token = localStorage.getItem("TOKEN");
  const [posts, setPosts] = useState({});

  const response = fetch(
    "https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/me",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      setPosts(result.data.messages);
      console.log("response: ", response);
      console.log("result: ", messages);
    })
    .catch(console.error);

  const editButton = (event) => {
    // show "edit window"
  };

  return (
    <>
      {posts.length ? (
        <div id="my-posts-container">
          <h1>My Posts</h1>
          {rlt.data.posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>
                <b>Author:</b> {post.author.username},<b>Price:</b> {post.price}
              </p>
              <form>
                <button type="button" onClick={editButton}>
                  Edit Post
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div id="my-posts-container">
          <h1>My Posts</h1>
          <p> No Posts Found</p>
        </div>
      )}
    </>
  );
};

export default MyPosts;
