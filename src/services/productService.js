import http from "../services/httpService";
import { apiUrl } from "../config.json";

export function editOrCreateProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return http.put(apiUrl + "product/" + product._id, product);
  }
  return http.post(apiUrl + "product", product);
}

export function deleteProduct(id) {
  return http.delete(apiUrl + "product/" + id);
}

export function getProducts() {
  return http.get(apiUrl + "products");
}

export function getProduct(id) {
  return http.get(apiUrl + "product/" + id);
}

export function getCategories() {
  return http.get(apiUrl + "categories");
}
