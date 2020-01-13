import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import { deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";
import "../sass/Product.scss";

const Product = ({ product }) => {
  const { dispatch } = useContext(ProductContext);
  const { state } = useContext(AuthContext);
  const { user } = state;
  const { _id, image, price, name, inCart } = product;

  const onHandleDelete = async () => {
    try {
      await deleteProduct(_id);
      dispatch({ type: "CLEAR_DATA" });
    } catch (error) {
    }
  };

  return (
    <div className="card">
      <div className="image">
        <img src={image} alt="" />
        {inCart && (
          <i
            onClick={() => dispatch({ type: "DELETE_ITEM", payload: _id })}
            className="fa fa-remove cart"
          ></i>
        )}
        {!inCart && (
          <i
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: _id })}
            className="fas fa-cart-plus cart"
          ></i>
        )}
      </div>

      <div className="card-info">
        <div className="info">
          <h4 className="name">{name}</h4>
          <span className="price">${price}</span>
        </div>
        {user && user.isAdmin && (
          <div className="admin">
            <Link className="fas fa-edit icon" to={`/product/${_id}`}></Link>
            <i
              onClick={onHandleDelete}
              className="fas fa-trash-alt icon"
              id="trash"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
