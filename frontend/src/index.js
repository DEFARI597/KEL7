import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Changed from './login' to './App'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
