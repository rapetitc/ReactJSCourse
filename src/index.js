import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "https://unpkg.com/@tailwindcss/browser@4.0.8/dist/index.global.js";

import App from "./App";
import { CartProvider } from "./Context/CartContext";
import { SessionProvider } from "./Context/SessionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
