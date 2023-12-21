import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import GetInstaceDetails from "./components/get-instance-details";
import NavComponents from "./components/UI/Nav";

const root = ReactDOM.createRoot(document.getElementById("root"));
let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path:"/get-instance-details",
    element:<GetInstaceDetails />
  }
]);
root.render(
  <React.StrictMode>
    <NavComponents />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
