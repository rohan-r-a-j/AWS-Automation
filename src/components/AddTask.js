import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";
import { StateContext } from "../context/state";
const AddTask = () => {
  let [loading, setLoading] = useState(false);
  let [state, dispatch] = useContext(StateContext);
  let navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    let { name, url, type, description } = e.target.elements;

    // return console.log(e.target.elements);
    setLoading(true);
    fetch(`${baseUrl}/aws/lambda/create`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        url: url.value,
        type: type.value,
        description: description.value,
        account: state.currentAccount,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        toast(data.message, {
          draggable: false,
          position: "bottom-right",
          type: "success",
          theme: "colored",
        });
        setLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
        toast(err.message, {
          draggable: false,
          position: "bottom-right",
          type: "error",
          theme: "colored",
        });
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
                Lambda Name
              </label>
              <input name="name" type="text" className="form-control"></input>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              ></textarea>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Lambda URL
              </label>
              <input name="url" type="text" className="form-control"></input>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Type
              </label>
              <select name="type" type="text" className="form-control">
                <option value="">Please select</option>
                <option value="regular">Regular</option>
                <option value="ondemand">OnDemand</option>
                <option value="event">Event</option>
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
            <button
              onClick={() => navigate("/manage/user")}
              className="btn btn-outline-danger"
            >
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

export default AddTask;
