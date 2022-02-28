import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import {Community,
        Messages
} from './';

const Navigation = (props) => {
    const {posts} = props;
    console.log(posts);

    return <>

        <div id="multi-pages">
        <Switch>
            <Route path="/community">
                <Community posts={posts}/>
            </Route>
            <Route path="/messages">
                <Messages />
            </Route>
            {/* <Route path="/my-posts">
                <MyPosts />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route> */}
            <Route exact path="/">
                <Community posts={posts}/>
            </Route>
        </Switch>
        </div>
    
    </>
}

export default Navigation;