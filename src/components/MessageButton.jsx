import React from "react";

const MessageButton = () => {
  const msgButton = (event) => {
    // show "message form"
  };

  return (
    <form>
      <button id="button2" type="button" onClick={msgButton}>
        Message
      </button>
    </form>
  );
};

export default MessageButton;
