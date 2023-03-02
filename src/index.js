import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Import the Provider component from react-redux
import { Provider } from "react-redux";
// Import the "store" component that we created in the "store" folder
import store from "../src/store/store";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Implement the Provider component and pass "store" as one of its properties
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
