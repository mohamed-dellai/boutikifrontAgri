import React, { useEffect, useState } from "react";
import Head from "../../common/header/Head";
import Header from "../../common/header/Header";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import Footer from "../../common/footer/Footer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function Login() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const app = initializeApp({
    apiKey: "AIzaSyCw2v7AFJsSyTm5LfhXN3F4OT-G0l_hQyY",
    authDomain: "ecommerce-539b0.firebaseapp.com",
    projectId: "ecommerce-539b0",
    storageBucket: "ecommerce-539b0.appspot.com",
    messagingSenderId: "647019079940",
    appId: "1:647019079940:web:100169b153c0f9e593c851",
  });

  const auth = getAuth();
  const handleSubmit = async () => {
    signInWithEmailAndPassword(auth, login.username, login.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user.accessToken);
        localStorage.setItem("dashboardtoken", user.accessToken);
        const popup = window.open(
          "http://localhost:3001",
          "popup",
          "width=500,height=500"
        );
        popup.postMessage(user.accessToken, "http://localhost:3001");
        window.location.pathname = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
  useEffect(() => {}, [login]);
  return (
    <>
      <LoginContainer>
        <FormContainer>
          <ImgUser src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
          <label>Username</label>
          <TextField
            id="outlined-basic"
            label="Username"
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
