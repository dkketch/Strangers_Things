import React, { useState, useEffect } from "react";
import NewPostForm from "./NewPostForm";
import EditPost from "./EditPost";

const MyPosts = () => {
  const token = localStorage.getItem("TOKEN");
  const myUsername = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [postID, setPostID] = useState("");
  const [resultData, setResultData] = useState({});
  const [showNewPostButton, setShowNewPostButton] = useState(true);
  const [showEditPostButton, setShowEditPostButton] = useState(true);

  
  useEffect(() => {
    const response = fetch(
      'https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/me',
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data.posts);
        setResultData(result.data);
        console.log("MyPosts response: ", response);
        console.log("MyPosts result: ", posts);
      })
      .catch(console.error);
  }, []);

  const createPost = () => {
    setShowNewPostButton(false);
  };

  function editButton(event){
    setShowEditPostButton(false);
    console.log(event.target.name);
    setPostID(event.target.name);
  };

  return (
    <>
    { showNewPostButton ? (
      <div>
      <form id="new-post-button">
        <button type="submit" onClick={createPost}>New Post</button>
      </form>
      { posts.length ? (
        <div id="my-posts-container">
          <h1>My Posts</h1>
          { showEditPostButton ? (
            posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>
                <b>Author:</b> {resultData.username}, <b>Price:</b> {post.price}
              </p>
              <button name={post._id} type="submit" onClick={(event) => {
                editButton(event);
              }}>
                Edit Post
              </button>
            </div> ))
          
          ) : (
                <EditPost posts={posts} postID={postID}/>
          )}
        </div>
      ) : (
        <div id="my-posts-container">
          <h1>My Posts</h1>
          <p> No Posts Found</p>
        </div>
      )}
      </div> 
      ) : (
        <NewPostForm setShowNewPostButton={setShowNewPostButton} />
      )
      }
    </>
    )
    };

export default MyPosts;
