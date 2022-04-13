import React, { useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState({});
  const token = localStorage.getItem("TOKEN");

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
      setMessages(result.data.messages);
      console.log("response: ", response);
      console.log("result: ", messages);
    })
    .catch(console.error);

  const replyButton = (event) => {
    // show "message form"
  };

  return (
    <>
      {messages.length ? (
        <div id="message-container">
          <h1>Messages</h1>
          {response.data.messages.map((msg) => (
            <div key={msg._id}>
              <p>
                <b>From:</b> {msg.fromUser.username},<b>On Post:</b>{" "}
                {msg.post.title}
              </p>
              <p>
                <b>Message:</b> {msg.content}
              </p>
              <form>
                <button type="button" onClick={replyButton}>
                  Reply
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div id="message-container">
          <h1>Messages</h1>
          <p> No Messages Found</p>
        </div>
      )}
    </>
  );
};

export default Messages;
