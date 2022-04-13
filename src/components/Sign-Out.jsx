import React, { useState, useEffect } from "react";
import App from "../index";

const SignOut = (props) => {
  const { showSignOutButton, setShowSignOutButton } = props;
  const { showButtonForm, setShowButtonForm } = props;
  const { setLoggedIn } = props;
  const { setShowHomeScreen } = props;

  const signOutButton = (event) => {
    setShowButtonForm(false);
    setShowSignOutButton(false);
    setLoggedIn(false);
    setShowHomeScreen(true);
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    App();
  };

  return (
    <>
      <div>
        {showSignOutButton ? (
          <div id="sign-out-button">
            <form>
              <button type="reset" onClick={signOutButton}>
                Sign Out
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SignOut;
