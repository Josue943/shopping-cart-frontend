import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CartItem } from "./CartItem";
import "../../sass/Cart.scss";

const Cart = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { cart, total } = state;

  return cart.length ? (
    <div className="cart-items">
      {cart.map(item => (
        <CartItem item={item} key={item._id} dispatch={dispatch} />
      ))}
      <p className="total">Total $ {total} USD</p>
      <button
        className="clear"
        onClick={() => dispatch({ type: "CLEAR_DATA" })}
      >
        <i className="fas fa-trash-alt"></i> Clear
      </button>
    </div>
  ) : (
    <h1 className="empty">YOUR CART IS CURRENTLY EMPTY</h1>
  );
};

export default Cart;
