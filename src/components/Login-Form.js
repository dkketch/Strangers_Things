import React, {useState, useEffect} from 'react';


const LogIn = (props) => {
    const {loggedIn, setLoggedIn} = props;
    const {showSignOutButton, setShowSignOutButton} = props;
    const {showButtonForm, setShowButtonForm} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [showUsernameForm, setShowUsernameForm] = React.useState(false);
    const [formHeading, setFormHeading] = useState('');
    

    const logInButton = (event) => {
        event.preventDefault()
        setShowUsernameForm(true)
        setShowButtonForm(false)
        setFormHeading('Log In')
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
            setShowUsernameForm(false);
            setShowButtonForm(true);
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
            setLoggedIn(true);
            // show nav options
        } else { 
            alert(result.error.message);
            setShowButtonForm(true);
            setShowUsernameForm(false);
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
            setLoggedIn(true);
            // show nav options
        } else { 
            alert(result.error.message);
            setShowButtonForm(false);
        }
      })
      .catch(console.error);

  }

  return <>
  <div id="form-main">
    { showButtonForm ?
        <form id="two-buttons">
          <div class="form-header">
                <h1>Stranger's Things</h1>
          </div>
          <button type='button' onClick={logInButton}>Log In</button>
          <button type='button' onClick={signUpButton}>Sign Up</button>
        </form>
      : null}

      { showUsernameForm 
      ? <div id="log-in-form" >
        <h1 class="form-header">{formHeading}</h1>
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
  </div>
  </>
}

export default LogIn;