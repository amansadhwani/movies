import "./App.css";
import MoviesList from "./Components/MoviesList";
import Header from "./Components/Header";
import CheckoutPage from "./Components/CheckoutPage";
//import Carsouel from "./Components/Carousell";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState } from "react";

const App = () => {
  const [cartData, setCartData] = useState([]);
  const addToGlobalCart = (count, movieData) => {
    let foundFlag = false;
    let existingCart = [];
    for (let i = 0; i < cartData.length; i++) {
      if (movieData.id === cartData[i].id) {
        foundFlag = true;
        if (count !== 0) {
          let tempCart = JSON.parse(JSON.stringify(movieData));
          tempCart.qty = count;
          existingCart.push(tempCart);
        }
      } else {
        existingCart.push(cartData[i]);
      }
    }

    if (!foundFlag) {
      let data = movieData;
      data.qty = count;
      existingCart.push(data);
    }

    setCartData(existingCart);
  };

  return (
    <div id="app">
      <BrowserRouter>
        <Header cartData={cartData} />
        <Switch>
          <Route exact path="/" component={MoviesList}>
            <MoviesList
              clearCart={() => setCartData([])}
              addToGlobalCart={(count, movieData) =>
                addToGlobalCart(count, movieData)
              }
            />
          </Route>
          <Route path="/checkout">
            <CheckoutPage
              cartData={cartData}
              clearCart={() => setCartData([])}
            />
          </Route>
          <MoviesList />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
