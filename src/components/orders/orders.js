import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  function decodeJWT(token) {
    const [headerEncoded, payloadEncoded, signature] = token.split(".");
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));

    return { header, payload, signature };
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("dashboardtoken"); // Modifier le nom du token si nécessaire
        const decoded = decodeJWT(token);
        const owner = decoded.payload.email;

        const response = await new Promise((resolve) => {
          setTimeout(async () => {
            const result = await axios.get("http://20.97.210.45/order");
            resolve(result);
          }, 5000); // Adjust the delay duration as needed
        });

        const filteredOrders = response.data.filter(
          (order) => order.owner === owner
        );

        setOrders(filteredOrders);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-list">
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders?.map((order, index) => (
          <div className="order-item" key={index}>
            <h3>Order #{index + 1}</h3>
            <div className="order-details">
              <div className="address">
                <strong>Address:</strong> {order.address}
              </div>
              <div className="zipCode">
                <strong>Zip Code:</strong> {order.zipCode}
              </div>
              <div className="country">
                <strong>Country:</strong> {order.country}
              </div>
            </div>
            <h4>Cart Items:</h4>
            <div className="cart-items">
              {order?.cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.cover} alt={item.name} />
                  <div className="item-details">
                    <h5>{item.name}</h5>
                    <div className="item-price">
                      <span>Price: ${item.price.toFixed(2)}</span>
                      <span>Qty: {item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
