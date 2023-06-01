import React, { useState } from "react";
import "./style.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { customAlphabet } from "nanoid";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Step: 7 calculate the total of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  function decodeJWT(token) {
    const [headerEncoded, payloadEncoded, signature] = token.split(".");
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));

    return { header, payload, signature };
  }
  const tokenD = localStorage.getItem("dashboardtoken");
  const tokenC = localStorage.getItem("clienttoken");

  // product qty total
  const handlePurchase = () => {
    const customid = customAlphabet("0123456789", 8);

    let decodedToken = null;
    if (tokenD !== null) {
      decodedToken = decodeJWT(tokenD);
    } else if (tokenC !== null) {
      decodedToken = decodeJWT(tokenD);
    }

    const order = {
      orderid: customid,
      address: address,
      zipCode: zipCode,
      country: country,
      cartItems: CartItem,
      owner: decodedToken ? decodedToken.payload.email : null,
    };
    axios
      .post("http://20.97.210.45/order/", order)
      .then((res) => {
        console.log(res.data);
        console.log("purchasing ...");
        console.log("here is cart item", CartItem);
        window.location.href = "/thankyou";
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          {/* if hamro cart ma kunai pani item xaina bhane no display */}
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}

            {/* yasma hami le cart item lai display garauncha */}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* step: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price:</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <div className="cart-total product" style={{ width: "30em" }}>
              <h2>Your Address </h2>
              <div className="d_flex">
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  label="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <TextField
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              {totalPrice > 0 && (
                <Button
                  variant="contained"
                  onClick={handlePurchase}
                  style={{ margin: "2em" }}
                >
                  Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
