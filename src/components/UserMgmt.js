import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/state";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const UserMgmt = () => {
  let [state, dispatch] = useContext(StateContext);
  let navigate = useNavigate();
  let [users, setUsers] = useState([]);

  function handleDelete(userId) {
    // eslint-disable-next-line no-restricted-globals
    let isOK = confirm("Do you want to delete this user?");
    if (isOK) {
      fetch("http://localhost:3000/users/delete", {
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
          // Add any additional headers if needed,
        },
        method: "DELETE",
        body: JSON.stringify({ userId: userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          alert("successfully deleted");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  useEffect(() => {
    fetch("http://localhost:3000/users/all", {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("fetch userss");
        dispatch({ type: "users", payload: { users: data } });
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center">
        <div className="card my-2">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div
                  className="btn btn-primary  btn-lg"
                  onClick={() => navigate("/manage/user/add")}
                >
                  {" "}
                  + Add User
                </div>
              </div>
              <div className="col-6 d-flex align-items-center">
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Type to search..."
                ></input>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Last login</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((item, index) => (
              <tr key={item._id.toString()}>
                <th scope="row">{index}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.type}</td>
                <td>
                  {item.lastLogin
                    ? moment(new Date(item.lastLogin)).fromNow()
                    : "Never logged in"}{" "}
                </td>
                <td>
                  <div
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`edit/${item._id}`)}
                  >
                    edit
                  </div>
                  <div
                    className="btn btn-sm btn-danger mx-1"
                    onClick={() => handleDelete(item._id.toString())}
                  >
                    delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMgmt;
