/*CART*/

export function addToCart(state, id) {
  const products = [...state.products];
  const product = getItem(products, id);
  product.inCart = true;
  product.quantity = 1;
  product.subTotal = product.price;
  const cart = [product, ...state.cart];
  const total = state.total + product.price;
  return { ...state, products, cart, total };
}

export function removeToCart(state, id) {
  const products = [...state.products];
  const product = getItem(products, id);
  const tempCart = [...state.cart];
  const cart = tempCart.filter(item => item !== product);
  product.inCart = false;
  product.quantity = 0;
  product.subTotal = product.price;
  const total = state.total - product.price;
  return { ...state, products, cart, total };
}

export function incrementItem(state, id) {
  const cart = [...state.cart];
  const product = getItem(cart, id);
  product.quantity += 1;
  product.subTotal = product.price * product.quantity;
  const total = state.total + product.price;
  return { ...state, cart, total };
}

export function decrementItem(state, id) {
  const cart = [...state.cart];
  const product = getItem(cart, id);
  product.quantity -= 1;
  if (product.quantity === 0) {
    return removeToCart(state, id);
  } else {
    product.subTotal = product.price * product.quantity;
    const total = state.total - product.price;
    return { ...state, cart, total };
  }
}

export function getItem(products, id) {
  const Products = [...products];
  const product = Products.find(item => item._id === id);
  return product;
}
