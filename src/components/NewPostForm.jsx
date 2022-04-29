import React, { useState } from "react";

const NewPostForm = (props) => {
    const { setShowNewPostButton } = props;
    const [checked, setChecked] = useState(false);
    const token = localStorage.getItem("TOKEN");
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postPrice, setPostPrice] = useState("");

    const checkBox = async() =>{
        setChecked(!checked);
    };

    const createPost = () => {
        const response = fetch('https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            post: {
                title: `${postTitle}`,
                description: `${postDescription}`,
                price: `${postPrice}`,
                willDeliver: `${checked}`
            }
        })
        }).then((response) => response.json())
        .then((result) => {
            console.log("result: ", result);
            console.log("response: ", response);
            setShowNewPostButton(false);
        })
        .catch(console.error);
    };

    return(
    <>
        <form onSubmit={createPost}>
            <title>Create New Post</title>
            <label>Post Title:</label>
              <input
                type="text"
                name="postTitle"
                value={postTitle}
                onChange={event => setPostTitle(event.target.value)}
              />
              <label>Post Description:</label>
              <input
                type="text"
                name="postDescription"
                value={postDescription}
                onChange={event => setPostDescription(event.target.value)}
              />
              <label>Post Pricing (USD):</label>
              <input
                type="text"
                name="postPrice"
                value={postPrice}
                onChange={event => setPostPrice(event.target.value)}
              />
              <div id="deliverY">
                <input
                  type="checkbox"
                  name="checked"
                  value={checked}
                  onChange={checkBox}
                />
                <label for="checked"> Will Deliver?</label>
              </div>
              <button type="submit">Create Post</button>
        </form>
    </>
    );
};

export default NewPostForm;