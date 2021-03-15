import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import generateStore from "./redux/store";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; 
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"; 
import './styles/styles.scss'
import "./assets/css/fonts.css"

const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
