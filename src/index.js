import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import { ThemeProvider } from "./hooks/Theme";
import { GlobalProvider } from "./hooks/GlobalContext";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { TimeoutProvider } from "./hooks/TimeOutProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
