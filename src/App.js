import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';

export const UserContext = createContext()

function App() {
  const [loggedInUser , setLoggedInUser ] = useState({})
  return (
    
      
  <UserContext.Provider value={[loggedInUser , setLoggedInUser]}>
    
      <Router>
      <Header></Header>
        <Switch>

          <Route path="/shop">
            <Shop/>
          </Route>

          <Route path="/review">
            <Review/>
          </Route>

          <Route path="/inventory">
            <Inventory/>
          </Route>

          <Route path="/product/:productKey">
            <ProductDetails/>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route exact path="/">
            <Shop/>
          </Route>

          <Route path="*">
            <NotFound/>
          </Route>

          

        </Switch>
      </Router>
       
      </UserContext.Provider> 
    
  );
}

export default App;
