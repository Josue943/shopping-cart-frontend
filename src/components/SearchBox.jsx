import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from '../context/AuthContext'
import "../sass/SearchBox.scss";

const SearchBox = ({props}) => {
  const { dispatch } = useContext(ProductContext);
  const { state ,dispatch:disp } = useContext(AuthContext);
  const {darkMode} = state

  const onHandleChange = query => {
    dispatch({
      type: "FILTER_DATA",
      payload: { query, category: { _id: "", name: "All Categories" } }
    });
  };

 

  return (
    <React.Fragment>
      <div className="form-control">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={e => onHandleChange(e.currentTarget.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className="toggle">
        <button onClick={() => disp({ type: "THEME_CHANGE" })}>
          {darkMode ? 'Light Mode': 'Dark Mode' }
        </button>
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
