import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import { StateContext } from "../context/state";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Task = () => {
  let [state, dispatch] = useContext(StateContext);
  let [tasks, setTasks] = useState([]);
  let { currentAccount } = state;
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
  function invokeTask(task) {
    // eslint-disable-next-line no-restricted-globals
    let cnf = confirm("Are you sure you want to invoke this?");
    if (!cnf) return;
    let promise = new Promise(async (resolve, reject) => {
      try {
        let res = await fetch(`${baseUrl}/aws/lambda/run`, {
          headers: {
            "Content-Type": "application/json",
            authorization: sessionStorage.getItem("token"),
          },
          method: "POST",
          body: JSON.stringify({
            account: currentAccount,
            type: task.type,
            name: task.name,
          }),
        });
        let data;
        // try {
        //   data = await res.json();
        //   if (data.error) throw Error(data.error);
        // } catch (error) {
        //   data = await res.text();
        // }
        console.log(data);
        if (res.ok) resolve(data);
      } catch (error) {
        console.error(error);
        reject(error.message);
      }
    });
    toast.promise(promise, {
      pending: "Invoking the task",
      success: "Successfully invoked the task",
      error: "failed to invoke the task",
    });
  }
  //   if (!tasks) return <div>loading</div>;
  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-center">
        <button
          onClick={() => navigate("create")}
          className="btn btn-primary task-button"
          style={{zIndex:1, position: "absolute", top:"85vh", bottom: "0vh;",  right:"5vh", }}
        >
          Add New Task +
        </button>
      </div>
      {tasks.length > 0 && (
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
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        onClick={() => invokeTask(item)}
                        className="btn btn-info btn-sm"
                      >
                        Invoke
                      </button>
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
