import React, { useState, useEffect } from "react";

const EditPost = (props) => {
  const token = localStorage.getItem("TOKEN");
  const { postID } = props.postID;
  const { posts } = props.posts;
  const [checked, setChecked] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postPrice, setPostPrice] = useState("");
  const [foundPost, setFoundPost] = useState({});
  
  console.log("posts: ", posts);
  { posts && posts.length ?
    posts.map((post) => {
      if (post._id === postID) {
        setFoundPost(post);
      }
    })
  : null};
  
  const editButton = () => {
    const response = fetch(`http://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts/${postID}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: `${postTitle}`,
        description: `${postDescription}`,
        price: `${postPrice}`,
        location: `${postLocation}`,
        willDeliver: `${checked}`
      }
    })
  }).then((response) => response.json())
    .then((result) => {
      console.log("EditPost result: ", result);
      console.log("EditPost response: ", response);
    })
    .catch(console.error);
  };

  return (
    <form>
      <title>Create New Post</title>
            <label>Post Title:</label>
              <input
                type="text"
                name="postTitle"
                value={foundPost.title}
                onChange={event => setPostTitle(event.target.value)}
              />
              <label>Post Description:</label>
              <input
                type="text"
                name="postDescription"
                value={foundPost.description}
                onChange={event => setPostDescription(event.target.value)}
              />
              <label>Post Pricing (USD):</label>
              <input
                type="text"
                name="postPrice"
                value={foundPost.price}
                onChange={event => setPostPrice(event.target.value)}
              />
              <label>Post Location:</label>
              <input
                type="text"
                name="postLocation"
                value={foundPost.location}
                onChange={event => setPostLocation(event.target.value)}
              />
              <div id="deliverY">
                <input
                  type="checkbox"
                  name="checked12"
                  value={foundPost.willDeliver}
                  onChange={setChecked(!checked)}
                />
                <label>Will Deliver?</label>
              </div>
      <button type="submit" onClick={editButton}>
        Edit Post
      </button>
    </form>
  );
};

export default EditPost;