import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import GetInstaceDetails from "./components/get-instance-details";
import NavComponents from "./components/UI/Nav";
import StateProvider from "./context/state";
import Login from "./components/Login";
import UserMgmt from "./components/UserMgmt";
import AddUser from "./components/AddUser";

let authHandler = () => {
  let token = sessionStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }
  return {};
};
let rootHandler = () => {
  let token = sessionStorage.getItem("token");
  let user = JSON.parse(sessionStorage.getItem("user"));

  if (!token) {
    throw redirect("/login");
  } else if (user.type !== "root") {
    console.log("roothandler", user);
    throw redirect("/");
  }
  return {};
};
const root = ReactDOM.createRoot(document.getElementById("root"));
let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: authHandler,
  },
  // {
  //   path: "/home",
  //   loader: authHandler,
  //   element: <App />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/manage/user", element: <UserMgmt />, loader: rootHandler },
  { path: "/manage/user/add", element: <AddUser />, loader: rootHandler },
]);

console.log("INdex");
root.render(
  <>
    {/* <React.StrictMode> */}
    <StateProvider>
      <NavComponents />

      <RouterProvider
        fallbackElement={
          <>
            <div>Loading...</div>
          </>
        }
        router={router}
      />
    </StateProvider>

    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export let navigate = router.navigate;
