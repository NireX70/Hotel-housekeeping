import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./store/context";
import { Provider } from "react-redux";

const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);
