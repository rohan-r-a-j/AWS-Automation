import React, { useContext, useState } from "react";
import "./styles/Login.css";
import { StateContext } from "../context/state";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";
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
          toast('Login successful',{draggable:false,position:'bottom-right',type:'success',theme:'colored'})
          dispatch({ type: "updateToken", payload: { token: token } });
          sessionStorage.setItem("token", token);
          navigate("/");
        } else if (res.status === 404) {
          toast("User Not Found",{draggable:false,position:'bottom-right',type:'error',theme:'colored'})
        } else {
          toast(token,{draggable:false,position:'bottom-right',type:'error',theme:'colored'})
        }
      }
    } catch (error) {
      toast(error.message,{draggable:false,position:'bottom-right',type:'error',theme:'colored'})
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
              <hr />
              <p>Please enter your Login Credentials</p>
             
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
                 <a href="mailto:aws-admins@hcl.com?subject=Password%20Reset%20Request%20for%20Administration%20Portal&body=%0ADear%20Admins%2C%0A%0AI%20forgot%20my%20password%20and%20am%20unable%20to%20log%20into%20the%20Administration%20Portal%20at%20https%3A//hcl-cloudadmins.com%0A%0APlease%20help%20me%20to%20reset%20my%20password%20so%20that%20I%20can%20log%20in%20again.%0A"  role="button"><span style={{color:"#7676ff"}}>Forgot password? </span></a>

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
