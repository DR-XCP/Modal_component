import React from "react";
import ReactDOM from "react-dom/client";
import App from "./lib/App";
import { ModalProvider } from "./lib/contexts/ModalContext";
import "./lib/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <ModalProvider>
      <App />
   </ModalProvider>
);
