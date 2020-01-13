import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Product from "./Product";
import ListGroup from "./ListGroup";
import SearchBox from "./SearchBox";
//styles
import "../sass/Home.scss";

const Home = () => {
  const { state } = useContext(ProductContext);
  const { filterData: products } = state;

  return (
    <div className="main-content">
      <div className="search">
        <SearchBox />
      </div>
      <div className="list-group">
        <ListGroup />
      </div>
      <div className="products">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
