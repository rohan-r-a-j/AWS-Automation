import React, { useContext, useState } from "react";
import "./styles/Login.css";
import { StateContext } from "../context/state";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let [loginData, setLoginData] = useState({});
  let [state,dispatch]=useContext(StateContext)
  let navigate = useNavigate()
  let handleChange = (e) =>
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(loginData);
    try {
      let res = await fetch("http://localhost:3000/auth/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: loginData }),
      });
      let token = await res.text();
      if (token) {
        // alert(`logged in ${token}`);
        dispatch({type:"updateToken",payload:{token:token}})
        sessionStorage.setItem("token", token);
        navigate('/')
      }
    } catch (error) {
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
              <div className="forgot">
                <a href="reset.html">Forgot password?</a>
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
