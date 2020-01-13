import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const AuthRoutes = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
