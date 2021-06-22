import { firebaseInstance, authService } from "fbase";
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Coninue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Coninue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
