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
import UpdateUser from "./components/UpdateUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./components/ChangePassword";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import IAMUsers from "./components/IAMUsers";

let permittedUsers = ["root", "admin"];
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
  } else if (!permittedUsers.includes(user.type)) {
    throw redirect("/");
  }
  return {};
};
const root = ReactDOM.createRoot(document.getElementById("root"));
let router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: authHandler,
  },
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/manage/user", element: <UserMgmt />, loader: rootHandler },
  { path: "/manage/user/add", element: <AddUser />, loader: rootHandler },
  {
    path: "/manage/user/edit/:id",
    element: <UpdateUser />,
    loader: rootHandler,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
    loader: authHandler,
  },
  { path: "/manage/task", element: <Task />, loader: rootHandler },
  { path: "/manage/task/create", element: <AddTask />, loader: rootHandler },
  {path:'/manage/iam/users',element:<IAMUsers />,loader:rootHandler }
]);

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
      <ToastContainer />
    </StateProvider>

    {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export let navigate = router.navigate;
