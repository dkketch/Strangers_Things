import React, {useState, useEffect} from 'react';


const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [showUsernameForm, setShowUsernameForm] = React.useState(false);
    const [showSignOutButton, setShowSignOutButton] = React.useState(false);
    const [showButtonForm, setShowButtonForm] = React.useState(true);
    const [formHeading, setFormHeading] = useState('');

    const logInButton = (event) => {
        event.preventDefault()
        setShowUsernameForm(true)
        setShowButtonForm(false)
        setFormHeading('Log In')
    }

    const signOutButton = (event) => {
        event.preventDefault()
        setShowButtonForm(true)
        setShowSignOutButton(false)
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }

    const signUpButton = (event) => {
        event.preventDefault()
        setShowUsernameForm(true)
        setShowButtonForm(false)
        setFormHeading('Sign Up')
    }

    const handleChange = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username != '' && password != ''){
     
      if (formHeading === "Log In") {
        console.log('inside if statement')
        console.log(username)
        localStorage.setItem('username', username);
        setUsername('')
        console.log(password)
        localStorage.setItem('password', password);
        setPassword('')
        returningUser();
      } else if (formHeading === 'Sign Up') {
        console.log('inside else if statement')
        if (passwordVerify === password) {
            console.log(username)
            localStorage.setItem('username', username);
            setUsername('')
            console.log(password)
            localStorage.setItem('password', password);
            setPassword('')
            setPasswordVerify('')
            registerUser();
        } else {
            const err = 'Passwords do not match';
            console.error(err);
            alert(err);
        }        
      }
    } else {
      const err = 'You must enter a Username and Password';
      console.error(err);
      alert(err);
    }
  }

  const registerUser = () => {
    console.log('Register User');
    fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.success) { 
            alert(result.data.message);
            localStorage.setItem('TOKEN', result.data.token );
            setShowUsernameForm(false);
            setShowSignOutButton(true);
            // show nav options
        } else { 
            alert(result.error.message);
            setShowButtonForm(true);
        }
      })
      .catch(console.error);
  }

  const returningUser = () => {
    console.log('Returning User');
    fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.success) { 
            alert(result.data.message);
            localStorage.setItem('TOKEN', result.data.token );
            setShowUsernameForm(false);
            setShowSignOutButton(true);
            // show nav options
        } else { 
            alert(result.error.message);
            setShowButtonForm(true);
        }
      })
      .catch(console.error);

  }

  return <>
  <div id="form-main">
    { showButtonForm ?
        <div id="two-buttons">
        <form>
          <button type='logIn' onClick={logInButton}>Log In</button>
          <button type='signUp' onClick={signUpButton}>Sign Up</button>
        </form>
        </div>
      : null}

      { showUsernameForm 
      ? <div id="log-in-form" >
        <h3>{formHeading}</h3>
            <form id="id-pwd" onSubmit={handleSubmit} >
              <label htmlFor='username'>Username:</label>
              <input type='text' name='username' value={username} onChange={handleChange} />
              <label htmlFor='password'>Password:</label>
              <input 
                type='password' 
                name='password' 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} />
              {
                formHeading === 'Sign Up'
                ? <div id="verify-pwd">
                    <label htmlFor='passwordVerify'>Confirm Password:</label>
                    <input 
                        type='password' 
                        name='password-verify' 
                        value={passwordVerify} 
                        onChange={(event) => setPasswordVerify(event.target.value)} />
                  </div>
                : null                
              }
              <button type='submit'>Submit</button>
            </form>
        </div> 
      : null }

        { showSignOutButton ?
                <div id="sign-out-button">
                <form>
                <button type='signOut' onClick={signOutButton}>Sign Out</button>
                </form>
                </div>
            : null}
  </div>
  </>
}

export default LogIn;