import React, {useState, useEffect} from 'react';

const SignOut = (props) => {        
    
    const {showSignOutButton, setShowSignOutButton} = props;
    const {showButtonForm, setShowButtonForm} = props;

    const signOutButton = (event) => {
        setShowButtonForm(true)
        setShowSignOutButton(false)
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        window.location.reload();
    }    
    
    return <>
    <div>
        { showSignOutButton ?
            <div id="sign-out-button">
            <form>
            <button type='reset' onClick={signOutButton}>Sign Out</button>
            </form>
            </div>
        : null}
    </div>
    </>
}

export default SignOut;