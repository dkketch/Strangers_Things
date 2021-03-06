import React, { useState, useEffect } from "react";
import MessageButton from "./MessageButton";

const Community = (props) => {
  const { posts } = props;
  const token = localStorage.getItem("TOKEN");

  return (
    <>
      {token ? (
        <div id="container">
          <h1>Posts</h1>
          {posts.length &&
            posts.map((post) => (
              <div key={post._id}>
                <h3 id="post-title">{post.title}</h3>
                <p id="post-desc">{post.description}</p>
                <p id="post-auth">
                  <b>Author:</b> {post.author.username},<b>Price:</b>{" "}
                  {post.price}
                </p>
                <MessageButton />
              </div>
            ))}
        </div>
      ) : (
        <div id="container">
          <h1>Posts</h1>
          {posts.length &&
            posts.map((post) => (
              <div key={post._id}>
                <h3 id="post-title">{post.title}</h3>
                <p id="post-desc">{post.description}</p>
                <p id="post-auth">
                  <b>Author:</b> {post.author.username},<b>Price:</b>{" "}
                  {post.price}
                </p>
                {}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Community;
