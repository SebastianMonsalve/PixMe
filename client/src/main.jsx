import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ContextApi } from "./components/contextApi.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/style.css";
import "./css/tablet.css";
import "./css/mobile.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextApi>
        <App />
      </ContextApi>
    </BrowserRouter>
  </React.StrictMode>
);
