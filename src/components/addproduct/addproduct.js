import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Alert, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import shortid from "shortid";
import { customAlphabet, nanoid } from "nanoid";
import { ClipLoader } from "react-spinners"; // Importez le composant ClipLoader

export default function AddProductForm() {
  const [product, setProduct] = useState({
    productname: "",
    Price: "",
    Brand: "",
    Category: "",
    Rating: "",
    Description: "",
  });
  const [token, setToken] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      //   window.location.href = "http://localhost:3000/login";
    } else {
      setToken(token);
    }
  }, []);
  const handleSubmit = async () => {
    setLoading(true); // Afficher le loader

    const customid = customAlphabet("0123456789", 8);

    console.log(customid());
    axios
      .post("http://20.97.210.45/product/", {
        productid: customid(),
        ...product,
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    console.log(product);
    setError(false);
  }, [product]);
  return (
    <>
      <LoginContainer>
        <FormContainer>
          <ImgUser src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png" />
          <TextField
            id="outlined-basic"
            label="Nom produit"
            variant="outlined"
            onChange={handleChange}
            name="productname"
            value={product.productname}
            style={{ margin: "1em" }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            onChange={handleChange}
            name="Price"
            value={product.Price}
            style={{ margin: "1em" }}
          />
          <TextField
            id="outlined-basic"
            label="Brand"
            variant="outlined"
            onChange={handleChange}
            name="Brand"
            value={product.Brand}
            style={{ margin: "1em" }}
          />
          <TextField
            id="outlined-basic"
            label="Category"
            variant="outlined"
            onChange={handleChange}
            name="Category"
            value={product.Category}
            style={{ margin: "1em" }}
          />
          <TextField
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            onChange={handleChange}
            name="Rating"
            value={product.Rating}
            style={{ margin: "1em" }}
          />

          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={handleChange}
            name="Description"
            value={product.Description}
            style={{ margin: "1em" }}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Ajouter
          </Button>

          {error && (
            <Alert severity="error" style={{ margin: "1em" }}>
              {" "}
              Desolé , un Erreur est survenue lors de l'ajout de votre produit .
              Veuillez Essayer une Autre fois !{" "}
            </Alert>
          )}
        </FormContainer>
      </LoginContainer>
    </>
  );
}
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const LoginContainer = styled.div`
  overflow: hidden;

  padding: 1.5em;
  position: absolute;
  width: 100%;
  height: auto;
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
