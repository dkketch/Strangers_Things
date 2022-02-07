import React, { useState, useEffect } from 'react';

const Messages = () => {
    const token = localStorage.getItem('TOKEN');
    const response = {};
    const result = {};

    
    fetch('https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => response.json())
    .then(result => {
        console.log(response)
        console.log(result)
    })
  .catch(console.error);
    
    
    return <>
    <div id='message-container'>
        <h1>Messages</h1>
        {/* {  
            posts.map(post => <div key={post._id}>
                <h3 id='post-title'>{post.title}</h3>
                <p id='post-desc'>{post.description}</p>
                <p id='post-auth'><b>Author:</b> {post.author.username}, <b>Price:</b> {post.price}</p>
            </div>)
        } */}
    </div>
        
    </>
}

export default Messages;