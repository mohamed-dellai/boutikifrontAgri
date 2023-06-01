import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";

import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import axios from "axios";
import imageListe from "./components/image";
import AddProductForm from "./components/addproduct/addproduct";
import ThankYouComponent from "./common/ThankyouComponent";
import Profile from "./components/profile/profile";
import LoginClient from "./components/client auth/login";
import SignupClient from "./components/client auth/signup";
import OrderList from "./components/orders/orders";
import OrderListAdmin from "./components/orders/ordersAdmin";

function App() {
  const [shopsData, setShopsData] = useState([]);
  const [shopItem, setShopItem] = useState([]);

  const createImgUrl = (productname) => {
    const lastWord = productname?.split(" ").pop();
    console.log("image", lastWord); // Output: Tablet
    switch (lastWord) {
      case "Camera":
        return imageListe.Camera;
      case "Laptop":
        return imageListe.Laptop;
      case "Monitor":
        return imageListe.Monitor;
      case "Smartphone":
        return imageListe.Smartphone;
      case "Tablet":
        return imageListe.Tablet;
      case "Headphones":
        return imageListe.Headphones;
      case "Speakers":
        return imageListe.Speaker;
      default:
        return imageListe.default;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://20.97.210.45/product");

        setShopsData((prevState) => {
          return [...response.data];
        });
      } catch (error) {
        console.log("fetching Error", error);
      }
    };

    // Delay the execution by 3 seconds using setTimeout
    const timer = setTimeout(() => {
      fetchData();
      console.log("shopsData", shopsData);
    }, 1000);

    // Clear the timer when the component unmounts or when the dependency array changes
    return () => clearTimeout(timer);
  }, []);

  //Step 1 :
  useEffect(() => {
    const fetchData = async () => {
      // Delay using setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust the delay duration as needed (in milliseconds)

      const data = shopsData.map((shopItem) => {
        return {
          id: shopItem.productid,
          cover: createImgUrl(shopItem.productname),
          name: shopItem.productname,
          price: shopItem.Price,
          discount: "0",
        };
      });

      setShopItem((prevState) => {
        return [...data];
      });
    };

    fetchData();
  }, [shopsData]);

  const { productItems } = Data;

  //Step 2 :
  const [CartItem, setCartItem] = useState([]);

  //Step 4 :
  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id);
    // if productExit chai alredy exit in cart then will run fun() => setCartItem
    // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
    // gayara check garxa if item.id ra product.id chai match bhayo bhane
    // productExit product chai display garxa
    // ani increase  exits product QTY by 1
    // if item and product doesnt match then will add new items
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      // but if the product doesnt exit in the cart that mean if card is empty
      // then new product is added in cart  and its qty is initalize to 1
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id);

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItem}
            />
          </Route>
          <Route path="/cart" exact>
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact component={Signup} />
          <Route path="/thankyou" exact component={ThankYouComponent} />
          <Route path="/myorders" exact component={OrderList} />
          <Route path="/orders" exact component={OrderListAdmin} />

          <Route path="/addproduct" exact component={AddProductForm} />
          <Route path="/clientlogin" exact component={LoginClient} />
          <Route path="/clientsignup" exact component={SignupClient} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
