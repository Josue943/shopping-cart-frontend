import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import "../sass/Navbar.scss";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;
  const { state: products } = useContext(ProductContext);
  const { cart } = products;

  return (
    <nav className="navbar">
      <ul className="nav">
        <div className="nav-items">
          <Link className="brand" to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              alt=""
            />
          </Link>
          {user && user.isAdmin && (
            <NavLink className="nav-item" to="/product/new">
              New
            </NavLink>
          )} 
        </div>

        <div className="nav-items">
          <NavLink className="nav-item" to="/cart">
            <i className="fas fa-shopping-cart  cart-logo"></i>
            <div className="cart-number">{cart.length}</div>
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item" to="/register">
                <i className="fas fa-user-alt">Register</i>
              </NavLink>
              <NavLink className="nav-item" to="/login">
                <i className="fas fa-sign-in-alt">Login</i>
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                className="nav-item"
                to=""
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </NavLink>
              <NavLink className="nav-item name" to="/">
                {user.name}
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
