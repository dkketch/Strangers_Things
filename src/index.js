import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';

import {
  LogIn,
  Navigation,
  Community
} from './components';

const App = () => {
  const [posts, setPosts] = useState([]);
  
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
    <main>
      <div id="main-nav">
          <Link to="/community">Community Posts</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/my-posts">My Posts</Link>
          <Link to="/profile">Profile</Link>
        
        <LogIn />
      </div>
      <Navigation posts={posts}/>

    </main>
  </BrowserRouter>
  </>   
}


ReactDOM.render(
  <App/>,
  document.getElementById('app'),
);