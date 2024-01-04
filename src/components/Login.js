import React, { useContext, useState } from "react";
import "./styles/Login.css";
import { StateContext } from "../context/state";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
const Login = () => {
  let [loginData, setLoginData] = useState({});
  let [state, dispatch] = useContext(StateContext);
  let navigate = useNavigate();
  let handleChange = (e) =>
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(loginData);
    try {
      let res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: loginData }),
      });
      let token = await res.text();
      if (token) {
        // alert(`logged in ${token}`);
        if (res.ok) {
          dispatch({ type: "updateToken", payload: { token: token } });
          sessionStorage.setItem("token", token);
          navigate("/");
        } else if (res.status === 404) {
          alert("User Not Found");
        } else {
          alert(token);
        }
      }
    } catch (error) {
      alert(error.message)
      console.error(error);
    }
  }
  return (
    <>
      <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Administrator Login</h2>
              <p>Please enter your email and password</p>
            </div>
            <form id="Login" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email Address"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={handleChange}
                ></input>
              </div>
              <div
               
                className="forgot"
                
              >
                <a  onClick={() =>
                  alert(
                    "Connect to Admin for password or Reach out to aws-admins@hcl.com"
                  )
                } role="button">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
