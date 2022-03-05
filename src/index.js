import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';

import {
  LogIn,
  Navigation,
  SignOut
} from './components';


const App = () => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignOutButton, setShowSignOutButton] = React.useState(false);
  const [showButtonForm, setShowButtonForm] = React.useState(true);
  
  useEffect(() => {
      const fetchPosts = async () => {
      const resp = await fetch('https://strangers-things.herokuapp.com/api/2110-VPI-WEB-PT/posts');
      const data = await resp.json();
      setPosts(data.data.posts);
      }    
      fetchPosts()
  }, [])
  console.log(posts);

  return <>
  <BrowserRouter>
    {!loggedIn ?
      <div id="logInScreen">
        <LogIn 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          showSignOutButton={showSignOutButton}
          setShowSignOutButton={setShowSignOutButton}
          showButtonForm={showButtonForm}
          setShowButtonForm={setShowButtonForm}
          />
      </div>
    :null}
    
    { loggedIn ?
      <main>
        <div id="main-nav">
            <Link to="/community">Community Posts</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/my-posts">My Posts</Link>
            <Link to="/profile">Profile</Link>
            <SignOut
              showSignOutButton={showSignOutButton}
              setShowSignOutButton={setShowSignOutButton}
              showButtonForm={showButtonForm}
              setShowButtonForm={setShowButtonForm}
            />
        </div>
        <Navigation posts={posts}/>

      </main>
    :null}
  </BrowserRouter>
  </>   
}


ReactDOM.render(
  <App/>,
  document.getElementById('app'),
);