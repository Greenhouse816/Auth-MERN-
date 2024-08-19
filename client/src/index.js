//React
import React from "react";
import ReactDOM from "react-dom/client";
//REDUXXXXXXXXXXX
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//Redux Middleware
import thunk from "redux-thunk";
//Assets And Components
import App from "./App";
import "./style.css";
//Reducers
import reducers from "./reducers";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/Default";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
