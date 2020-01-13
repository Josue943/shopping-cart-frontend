import React from 'react';
//ROUTER
import { Route, Redirect, Switch } from 'react-router-dom'
//components
import Navbar from './components/Navbar';
import Home from './components/Home';
//context
import ProductContextProvider from './context/ProductContext';
import Login from './components/Login';
import AuthContextProvider from './context/AuthContext';
import New from './components/New';
import Cart from './components/cart/Cart';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import Register from './components/Register';
import { Notfound } from './components/Notfound';
import { AuthRoutes } from './helpers/ProtectedAuthRoute';

 function App() {
  return (
    <React.Fragment>
       <AuthContextProvider>
       <ProductContextProvider>
        <Navbar/> 
        <div className="container">
        <Switch>  
          <Route path="/" component={Home}  exact/> 
          <Route  path="/register" component={Register} /> 
        {/*   <AuthRoutes path="/login" component={Login} /> */}
          <Route  path="/login" component={Login} /> 
          <Route  path="/cart" component={Cart} /> 
          <ProtectedRoute  path="/product/:id" component={New} /> 
          <Route  path="/not-found" component={Notfound} /> 
          <Redirect to="/not-found"/>
        </Switch>
        </div>
      </ProductContextProvider> 
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App; 

