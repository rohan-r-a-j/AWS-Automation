import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import { StateContext } from "../context/state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Task = () => {
  let [state, dispatch] = useContext(StateContext);
  let [tasks, setTasks] = useState([]);
  let {currentAccount}=state
  let navigate = useNavigate();
  useEffect(() => {
    fetch(`${baseUrl}/aws/lambda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ type: "ondemand", account: state.currentAccount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setTasks(data);
      })
      .catch((err) => {
        console.error(err);
        toast(err.message, {
          theme: "colored",
          position: "bottom-right",
          draggable: false,
        });
      });
  }, [currentAccount]);
  //   if (!tasks) return <div>loading</div>;
  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-center">
        <button
          onClick={() => navigate("create")}
          className="btn btn-lg btn-success my-3"
        >
          Add New Task +
        </button>
      </div>
      {tasks.length>0 && (
        <div className="row my-4">
          <div className="col-13">
            <table className="table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Service Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={()=>alert("Clicked")} className="btn btn-info btn-sm">Invoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
