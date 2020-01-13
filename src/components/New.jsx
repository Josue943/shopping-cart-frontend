import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { editOrCreateProduct, getProduct } from "../services/productService";
import { useForm, renderInput, renderSelect } from "./Form";
import { useHistory } from "react-router-dom";
import "../sass/New.scss";
import Joi from "joi-browser";

const New = props => {
  const { state, dispatch } = useContext(ProductContext);
  const { categories } = state;
  const [product, SetProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: ""
  });
  const history = useHistory();

  const schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    price: Joi.number()
      .required()
      .label("Price"),
    categoryId: Joi.required().label("Category"),
    image: Joi.string()
      .strict()
      .trim()
      .required()
      .label("ImageUrl")
  };

  const createProduct = async () => {
    try {
      await editOrCreateProduct(values);
      dispatch({ type: "UPDATE" });
      props.history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    async function edit() {
      try {
        const productId = props.match.params.id;
        if (productId === "new") return null;
        const { data } = await getProduct(productId);
        const { _id, name, price, category, image } = data;
        SetProduct({ _id, name, price, categoryId: category._id, image });
      } catch (ex) {
        history.replace("/not-found");
      }
    }
    edit();
  }, []);

  const { values, errors, onSubmit, onChange } = useForm(
    createProduct,
    product,
    schema
  );

  return (
    <div className="form-container">
      <h1></h1>
      <form onSubmit={onSubmit}>
        {renderInput(
          "name",
          "Name",
          "text",
          values.name,
          onChange,
          errors.name
        )}
        {renderInput(
          "price",
          "Price",
          "number",
          values.price,
          onChange,
          errors.price
        )}
        {renderSelect(
          "categoryId",
          "Category",
          categories,
          values.categoryId,
          onChange,
          errors.categoryId
        )}
        {renderInput(
          "image",
          "Image Url",
          "string",
          values.image,
          onChange,
          errors.image
        )}
        <button>Send</button>
      </form>
      <div className="product-card">
        <div className="image-container">
          <img src={values.image} alt="" />
        </div>
        <div className="info">
          <h4 className="name">{values.name}</h4>
          {values.price && <span className="price">${values.price}</span>}
        </div>
      </div>
    </div>
  );
};

export default New;
