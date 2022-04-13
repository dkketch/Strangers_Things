import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter } from "react-router-dom";

import { LogIn, Navigation, SignOut } from "./components";

localStorage.clear();

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignOutButton, setShowSignOutButton] = React.useState(false);
  const [showButtonForm, setShowButtonForm] = React.useState(false);
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  const fetchPosts = async () => {
    const resp = await fetch(
      "https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts"
    );
    const data = await resp.json();
    setPosts(data.data.posts);
    console.log(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedIn(false);
    setShowButtonForm(true);
    setShowHomeScreen(false);
  };

  return (
    <>
      <BrowserRouter>
        {!showHomeScreen ? (
          <div id="logInScreen">
            <LogIn
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              showSignOutButton={showSignOutButton}
              setShowSignOutButton={setShowSignOutButton}
              showButtonForm={showButtonForm}
              setShowButtonForm={setShowButtonForm}
              setShowHomeScreen={setShowHomeScreen}
            />
          </div>
        ) : !loggedIn ? (
          <main>
            <div id="main-nav">
              <Link to="/community">Community Posts</Link>
              <form id="log-in-button">
                <button type="button" onClick={handleSubmit}>
                  Log In
                </button>
              </form>
            </div>
            <Navigation posts={posts} />
          </main>
        ) : (
          <main>
            <div id="main-nav">
              <Link to="/community">Community Posts</Link>
              <Link to="/messages">Messages</Link>
              <Link to="/my-posts">My Posts</Link>
              <Link to="/profile">Profile</Link>

              <SignOut
                setLoggedIn={setLoggedIn}
                showSignOutButton={showSignOutButton}
                setShowSignOutButton={setShowSignOutButton}
                showButtonForm={showButtonForm}
                setShowButtonForm={setShowButtonForm}
                setShowHomeScreen={setShowHomeScreen}
              />
            </div>
            <Navigation posts={posts} />
          </main>
        )}
      </BrowserRouter>
    </>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
