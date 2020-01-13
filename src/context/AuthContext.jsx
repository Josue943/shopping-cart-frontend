import React, { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/AuthReducer";
import http from "../services/httpService";
import { getUser } from "../services/authService";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const initialState = {
    token: null,
    user: null,
    darkMode: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function validateToken() {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const Token = { token: token };
      try {
        const { data: user } = await getUser(Token);
        dispatch({
          type: "LOGIN",
          payload: {
            token,
            user
          }
        });
        http.setJwt(token);
      } catch (error) {
        localStorage.removeItem("token")
        return null;
      }
    }
   
    validateToken();
  }, []);

  

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
