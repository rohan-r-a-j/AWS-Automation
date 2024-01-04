import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../context/state";

const UpdateUser = () => {
  let params = useParams();
  let [state, dispatch] = useContext(StateContext);
  console.log(params, state);

  const [user, setUser] = useState(
    state.users.find((item) => item._id.toString() === params.id)
  );
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    console.log("update", state);
  }, [state]);
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated user data back to the server
    console.log("Updated User Data:", user);

    fetch("http://localhost:3000/users/update", {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
      method: "POST",
      body: JSON.stringify({ role: user.type, password: user.password,userId:user._id.toString() }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setUser(data);
        console.log("updated", data);
        alert("Successfully Updated");
      })
      .catch((err) => {
        console.error(err);
        alert("Somthing went wrong");
      });
    setEditMode(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (!user) return <div>Chala ja BSDK</div>;

  return (
    <div className="container mt-4 px-5">
      <h2>User Details</h2>
      <div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            readOnly
            value={user.name}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            readOnly
            value={user.email}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Accounts</label>
          {user.accounts.map((account) => (
            <input
              type="text"
              className="form-control mb-2"
              readOnly
              key={account._id}
              value={`${account.provider} - ${account.accountId}`}
            />
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          {editMode ? (
            <select
              className="form-control"
              name="type"
              value={user.type}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              readOnly
              value={user.type === "admin" ? "Admin" : "User"}
            />
          )}
        </div>

        {editMode ? (
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
