import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm, renderInput } from "./Form";
import { login, getUser } from "../services/authService";
import "../sass/Login.scss";
import Joi from "joi-browser";
import { useHistory, Redirect } from "react-router-dom";

const Login = props => {
  const history = useHistory();
  const { dispatch, state } = useContext(AuthContext);
  const { user: User } = state;

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const schema = {
    email: Joi.string()
      .strict()
      .trim()
      .required(),
    password: Joi.string()
      .strict()
      .trim()
      .min(5)
      .max(10)
      .required()
  };

  async function submit() {
    try {
      const { email, password } = values;
      const token = await login(email, password);
      const Token = { token: token };
      const { data: user } = await getUser(Token);
      dispatch({ type: "LOGIN", payload: { token, user } });
      const Url = props.location.state;
      const url = Url ? Url.from.pathname : "/";
      history.push(url);
    } catch (error) {
      setError(error.response.data);
    }
  }


  const { values, errors, onSubmit, onChange } = useForm(submit, user, schema);

  return (
    <div className="login">
      <h1 className="title">Login</h1>
      <form onSubmit={onSubmit}>
        {error && <div className="alert-danger">{error}</div>}
        {renderInput(
          "email",
          "Email",
          "text",
          values.email,
          onChange,
          errors.email,
          "Enter Email..."
        )}
        {renderInput(
          "password",
          "Password",
          "password",
          values.password,
          onChange,
          errors.password,
          "Enter Password..."
        )}
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
