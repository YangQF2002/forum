import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CreateAccount from "./components/CreateAccount.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <CreateAccount />
  </React.StrictMode>
);
