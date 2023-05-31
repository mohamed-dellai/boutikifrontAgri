import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function SignupClient() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
    email: "",
  });

  const app = initializeApp({
    apiKey: "AIzaSyAhQ8v9e3SEUshvh3qDpa1wyOjdNYMcRWk",
    authDomain: "e-commerce-client-ea7a5.firebaseapp.com",
    projectId: "e-commerce-client-ea7a5",
    storageBucket: "e-commerce-client-ea7a5.appspot.com",
    messagingSenderId: "529399469981",
    appId: "1:529399469981:web:2a4174b0188562553b8174",
  });
  const auth = getAuth();
  const handleSubmit = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      login.email,
      login.password
    )
      .then((userCredential) => {
        // Signed in
        console.log("DONE");
        const user = userCredential.username;
        console.log(user);
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log(" NOT DONE");

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    await updateProfile(user, { displayName: "Jane Q. User" });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    console.log(login);
  }, [login]);
  return (
    <>
      <LoginContainer>
        <FormContainer>
          <ImgUser src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
          <label>Username</label>
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            onChange={handleChange}
            name="username"
            value={login.username}
          />
          <label>Password</label>
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            onChange={handleChange}
            name="password"
            value={login.password}
            type="password"
          />
          <label>Email</label>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            onChange={handleChange}
            name="email"
            value={login.email}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </FormContainer>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  height: 80%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5em;
  box-shadow: 1px 4px 11px 1px rgba(213, 162, 162, 0.66);
  -webkit-box-shadow: 1px 4px 11px 1px rgba(213, 162, 162, 0.66);
  -moz-box-shadow: 1px 4px 11px 1px rgba(213, 162, 162, 0.66);
`;
const ImgUser = styled.img`
  width: 120px;
  height: 150px;
  margin-left: 10em;
  margin-bottom: 1em;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
