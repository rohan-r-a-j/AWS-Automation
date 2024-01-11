import React, { useState, useRef } from "react";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";
import { navigate } from "..";

let passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const ChangePassword = () => {
  let [isValid, setIsValid] = useState({
    oldPassword: { error: true },
    newPassword: { error: true },
    cnfnewPassword: { error: true },
  });
  let oldInputRef = useRef(null);
  let newInputRef = useRef(null);
  let cnfInputRef = useRef(null);
  async function handleChange(e) {
    e.preventDefault();
    let { oldPassword, newPassword } = e.target.elements;

    try {
      if (oldPassword.value && newPassword.value) {
        let res = await fetch(`${baseUrl}/users/changePassword`, {
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("token"),
            // Add any additional headers if needed,
          },
          method: "POST",
          body: JSON.stringify({
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          }),
        });
        let data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        toast(data.message, {
          type: "success",
          position: "bottom-right",
          theme: "colored",
        });
      }
    } catch (error) {
      toast(error.message, {
        type: "error",
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  function validatePassword(e) {
    let text = e.target.value;

    if (text.toString().match(passregex)) {
      setIsValid((prev) => ({
        ...prev,
        [e.target.name]: { ...prev[e.target.name], error: false },
      }));
    } else {
      setIsValid((prev) => ({
        ...prev,
        [e.target.name]: { ...prev[e.target.name], error: true },
      }));
    }
  }
  function handleFocus(e) {
    setIsValid((prev) => ({
      ...prev,
      [e.target.name]: { ...prev[e.target.name], touched: true },
    }));
  }
  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex flex-row justify-content-center align-items-center h-full    "
    >
      <div style={{ width: "40%" }} className="card p-3 ">
        <h3 className="text-left">Change Password For Portal Access</h3>
        <hr />
        <form className="row" onSubmit={handleChange}>
          <div className="col-12">
            <label>Enter Your current password:</label>
            <input
              name="oldPassword"
              className="form-control"
              onChange={validatePassword}
              ref={oldInputRef}
              onBlur={handleFocus}
            />
            {isValid["oldPassword"]?.error &&
              isValid["oldPassword"]?.touched && (
                <div className="text-danger">Invalid password format</div>
              )}
          </div>
          <div className="col-6">
            <label>Enter a new password:</label>
            <input
              name="newPassword"
              className="form-control"
              onChange={validatePassword}
              ref={newInputRef}
              onBlur={handleFocus}
            />
            {isValid["newPassword"]?.error &&
              isValid["newPassword"]?.touched && (
                <div className="text-danger">Invalid password format</div>
              )}
          </div>
          <div className="col-6">
            <label>Confirm your new password:</label>
            <input
              name="cnfnewPassword"
              className="form-control"
              onChange={validatePassword}
              ref={cnfInputRef}
              onBlur={handleFocus}
            />
            {isValid["cnfnewPassword"]?.error &&
              isValid["cnfnewPassword"]?.touched && (
                <div className="text-danger">Invalid password format</div>
              )}
          </div>
          <div className="d-grid gap-2  my-2">
            <button
              disabled={
                Object.values(isValid).some((item) => item.error) ||
                Object.values(isValid).length === 0
              }
              className="btn btn-primary"
            >
              Submit
            </button>
            <button type="button" onClick={()=>navigate(-1)} className="btn btn-outline-danger">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
