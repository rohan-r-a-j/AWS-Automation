import React, { useState } from "react";
import "./styles/loader.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";
const AddUser = () => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    let { firstName, lastName, email, password, cnfPassword, role, accountId } =
      e.target.elements;
    let userData = {};

    userData.name = `${firstName.value} ${lastName.value}`;
    userData.role = role.value;
    userData.email = email.value;
    userData.password = password.value;
    // userData.accountId = accountId.value;
  
    setLoading(true);
    fetch(`${baseUrl}/users/create`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
      method: "POST",
      body: JSON.stringify({ user: userData }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
       
        if (data.error) {
          throw new Error(data.error);
        }
        toast(`User ${data.name} created`,{draggable:false,position:'bottom-right',type:'success',theme:'colored'})
        setLoading(false);
        navigate("/manage/user");
      })
      .catch((err) => {
        console.error(err);
        toast(err.message,{draggable:false,position:'bottom-right',type:'error',theme:'colored'})
        setLoading(false);
      });
  }
  return (
    <div
      style={{ height: "100%" }}
      className="d-flex flex-row justify-content-center align-items-center"
    >
      <div
        className="card w-50 p-4 my-4"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <form onSubmit={onSubmit}>
          <h4>Create a new User</h4>
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
              ></input>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              ></input>
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input name="email" type="email" className="form-control"></input>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
              ></input>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Confirm Password
              </label>
              <input
                name="cnfPassword"
                type="password"
                className="form-control"
              ></input>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                role
              </label>
              <select name="role" type="text" className="form-control">
                <option value="">Please select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {/* <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                AccountId
              </label>
              <select
                name="accountId"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              >
                <option value="">Please select</option>
                <option value="051650638025">051650638025</option>
                <option value="388328004932">388328004932</option>
              </select>
            </div> */}
          </div>
          <div className="mb-3 form-check">
            <input
              name="agree"
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            ></input>
            <label className="form-check-label" htmlFor="exampleCheck1">
              Agree
            </label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-outline-success">
              Create
            </button>
            <button onClick={()=>navigate('/manage/user')} className="btn btn-outline-danger">
              Discard
            </button>
          </div>
        </form>
        {loading && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.5)",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 3,
            }}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <div className="loader">
              <li className="ball"></li>
              <li className="ball"></li>
              <li className="ball"></li>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
