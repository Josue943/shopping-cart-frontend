import React, { createContext, useEffect, useReducer } from "react";
import { productReducer } from "../reducers/ProductReducer";
import _ from "lodash";
import { getProducts, getCategories } from "../services/productService";

export const ProductContext = createContext();

const ProductContextProvider = props => {
  const initialState = {
    products: [],
    sortColumn: { path: "title", order: "asc" },
    filterData: [],
    selectedCategory: { _id: "", name: "All Categories" },
    categories: [],
    cart: [],
    total: 0,
    reload: false
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    async function getData() {
      const { data: products } = await getProducts();
      const { data } = await getCategories();
      let categories = [{ _id: "", name: "All Categories" }, ...data];
      dispatch({
        type: "FETCH_DATA",
        payload: {
          products,
          categories
        }
      });
    }
    getData();
  }, [state.reload]);
  /*   */
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
