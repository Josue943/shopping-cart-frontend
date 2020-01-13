import _ from "lodash";
import {
  addToCart,
  removeToCart,
  incrementItem,
  decrementItem
} from "../services/cart";

export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        products: action.payload.products,
        categories: action.payload.categories,
        filterData: sort(action.payload.products, state)
      };

    case "FILTER_DATA":
      return filter(state, action.payload.query, action.payload.category);

    case "ADD_TO_CART":
      return addToCart(state, action.payload);

    case "DELETE_ITEM":
      return removeToCart(state, action.payload);

    case "INCREMENT_ITEM":
      return incrementItem(state, action.payload);

    case "DECREMENT_ITEM":
      return decrementItem(state, action.payload);

    case "CLEAR_DATA":
      return { ...state, total: 0, reload: !state.reload, cart: [] };

    case "UPDATE":
      return { ...state, reload: !state.reload };

    default:
      return state;
  }
};

function sort(data, state) {
  const { sortColumn } = state;
  return _.orderBy(data, [sortColumn.path], [sortColumn.order]);
}

function filter(state, searchQuery, selectedCategory) {
  let filtered = state.products;
  if (searchQuery) {
    filtered = state.products.filter(p =>
      p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (selectedCategory._id) {
    filtered = state.products.filter(
      p => p.category._id === selectedCategory._id
    );
  }
  return { ...state, filterData: filtered, selectedCategory: selectedCategory };
}
