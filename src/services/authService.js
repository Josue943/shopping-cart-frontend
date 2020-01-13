import http from "./httpService";
import { apiUrl } from "../config.json";

export async function login(email, password) {
  const { data } = await http.post(apiUrl + "login", {
    //hacemos la peticion y le mandamos los datos guardamos la respuesta jwt
    email,
    password
  });
  saveToken(data.token);
  http.setJwt(data.token);
  return data.token;
}

export async function register(name, email, password) {
  const { data } = await http.post(apiUrl + "register", {
    name,
    email,
    password
  });
  saveToken(data.token);
  http.setJwt(data.token);
  return data.token;
}

export function saveToken(token) {
  localStorage.setItem("token", token); //guardamos el token}
}

export function getUser(token) {
  return http.post(apiUrl + "getuser", token);
}

export function logOut() {
  localStorage.removeItem("token");
  window.location = "/";
  return { token: null };
}
