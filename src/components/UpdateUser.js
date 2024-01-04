import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../context/state";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";

const UpdateUser = () => {
  let params = useParams();
  let navigate = useNavigate()
  let [state, dispatch] = useContext(StateContext);
  //console.log(params, state);

  const [user, setUser] = useState(
    state.users.find((item) => item._id.toString() === params.id)
  );
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    //console.log("update", state);
  }, [state]);
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated user data back to the server
    //console.log("Updated User Data:", user);

    fetch(`${baseUrl}/users/update`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
      method: "POST",
      body: JSON.stringify({
        role: user.type,
        password: user.password,
        userId: user._id.toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setUser(data);
        //console.log("updated", data);
        toast(`Successfully Updated the user ${data.name}`, {
          draggable: false,
          position: "bottom-right",
          type: "success",
          theme: "colored",
        });
      })
      .catch((err) => {
        console.error(err);
        toast(err.message, {
          draggable: false,
          position: "bottom-right",
          type: "error",
          theme: "colored",
        });
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
          <button onClick={()=>navigate('/manage/user')} className="btn btn-outline-danger mx-2">
              Discard
            </button>
      </div>
    </div>
  );
};

export default UpdateUser;
