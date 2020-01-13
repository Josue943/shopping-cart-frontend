import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "../sass/ListGroup.scss";

const ListGroup = props => {
  const { state, dispatch } = useContext(ProductContext);
  const { categories, selectedCategory } = state;

  return (
    <ul className="list">
      {categories.map(c => (
        <li
          className={c._id === selectedCategory._id ? "item active" : "item"}
          onClick={() =>
            dispatch({
              type: "FILTER_DATA",
              payload: { query: "", category: c }
            })
          }
          key={c._id}
        >
          {c.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
