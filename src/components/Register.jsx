import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm, renderInput } from "./Form";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import { register, getUser } from "../services/authService";
import "../sass/Register.scss";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const schema = {
    name: Joi.string()
      .strict()
      .trim()
      .required(),
    email: Joi.string()
      .strict()
      .trim()
      .required(),
    password: Joi.string()
      .min(5)
      .strict()
      .trim()
      .max(10)
      .required()
  };

  const history = useHistory();

  async function submit() {
    try {
      const { name, email, password } = values;
      const token = await register(name, email, password);
      const Token = { token: token };
      const { data: user } = await getUser(Token);
      dispatch({ type: "LOGIN", payload: { token, user } });
      history.push("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  const { values, errors, onSubmit, onChange } = useForm(submit, user, schema);

  return (
    <div className="register">
      <h1 className="title">Register</h1>
      {error && <div className="alert-danger">{error}</div>}
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
          "email",
          "Email",
          "text",
          values.email,
          onChange,
          errors.email
        )}
        {renderInput(
          "password",
          "Password",
          "password",
          values.password,
          onChange,
          errors.password
        )}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
