import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "https://unpkg.com/@tailwindcss/browser@4.0.8/dist/index.global.js";

import App from "./App";
import { CartProvider } from "./Context/CartContext";
import { AuthenticatorProvider } from "./Context/AuthenticatorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthenticatorProvider>
          <App />
        </AuthenticatorProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
