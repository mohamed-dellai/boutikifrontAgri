import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  const logout = () => {
    localStorage.removeItem("dashboardtoken");
    localStorage.removeItem("clientToken");
    window.location.pathname = "/";
  };
  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="catgrories d_flex">
            <span class="fa-solid fa-border-all"></span>
            <h4>
              Categories <i className="fa fa-chevron-down"></i>
            </h4>
          </div>

          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to="/">home</Link>
              </li>
              {localStorage.getItem("dashboardtoken") && (
                <li>
                  <Link to="/addproduct">Add product</Link>
                </li>
              )}
              {!localStorage?.getItem("dashboardtoken") &&
                !localStorage?.getItem("dashboardtoken") && (
                  <li>
                    <Link to="/login">Admin account</Link>
                  </li>
                )}
              {/* {!localStorage?.getItem("dashboardtoken") &&
                !localStorage?.getItem("clientToken") && (
                  <li>
                    <Link to="/signup">Create vendor Account</Link>
                  </li>
                )} */}
              {!localStorage?.getItem("clientToken") &&
                !localStorage?.getItem("dashboardtoken") && (
                  <li>
                    <Link to="/clientlogin">client account</Link>
                  </li>
                )}
              {!localStorage?.getItem("clientToken") &&
                !localStorage?.getItem("dashboardtoken") && (
                  <li>
                    <Link to="/clientsignup">Create Client Account</Link>
                  </li>
                )}
              {localStorage?.getItem("clientToken") && (
                <li>
                  <Link to="/myorders">My orders </Link>
                </li>
              )}
              {localStorage?.getItem("dashboardtoken") && (
                <li>
                  <Link to="/orders">Show orders </Link>
                </li>
              )}
              {localStorage?.getItem("dashboardtoken") && (
                <li>
                  <a href="http://localhost:3001/extra-pages/login">
                    Go to Dashboard{" "}
                  </a>
                </li>
              )}
              {localStorage?.getItem("clientToken") ||
                (localStorage?.getItem("dashboardtoken") && (
                  <li>
                    <Button onClick={logout}> Logout </Button>
                  </li>
                ))}
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
