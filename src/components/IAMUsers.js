import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/state";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";


const IAMUsers = () => {
  let [state, dispatch] = useContext(StateContext);
  let navigate = useNavigate();
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let { currentAccount } = state;

  function handelSearch(e) {
   
    if (e.target.value.trim() === "") return setUsers(state.iam_users);
    else
      setUsers(
        state.iam_users?.filter((item) =>
          item["Username"].toLowerCase().match(e.target.value.toLowerCase())
        )
      );
  }
  function handelDelete(userId) {
    // eslint-disable-next-line no-restricted-globals
    // let isOK = confirm("Do you want to delete this user?");
    // if (isOK) {
    //   fetch(`${baseUrl}/users/delete`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: sessionStorage.getItem("token"),
    //       // Add any additional headers if needed,
    //     },
    //     method: "DELETE",
    //     body: JSON.stringify({ userId: userId }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.error) {
    //         throw new Error(data.error);
    //       }
    //       toast(`User deleted successfully`, {
    //         draggable: false,
    //         position: "bottom-right",
    //         type: "warning",
    //         theme: "colored",
    //       });
    //       window.location.reload();
    //     })
    //     .catch((err) => {
    //       toast(err.message, {
    //         draggable: false,
    //         position: "bottom-right",
    //         type: "error",
    //         theme: "colored",
    //       });
    //     });
    // }
  }
  useEffect(() => {
    let iam_users = JSON.parse(sessionStorage.getItem("iam_users"));
    if (iam_users) {setUsers(iam_users); dispatch({ type: "iam_users", payload: { iam_users: iam_users } });}
    else {
      setLoading(true);
      fetch(`${baseUrl}/aws/lambda/run`, {
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
          // Add any additional headers if needed,
        },
        method: "POST",
        body: JSON.stringify({
          account: state.currentAccount,
          name: "iam_users",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setUsers(data);
          dispatch({ type: "iam_users", payload: { iam_users: data } });
         
          sessionStorage.setItem("iam_users", JSON.stringify(data));
        })
        .catch((err) => {
          console.error(err);
          setUsers([]);
          toast(err.message, {
            position: "bottom-right",
            theme: "colored",
            type: "error",
            draggable: false,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [currentAccount]);
  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center">
        <div className="card my-2">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div
                  className="btn btn-primary  btn-lg"
                  onClick={() => navigate("/manage/iam/users/create")}
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
                  placeholder="Type the username to Search"
                  onChange={handelSearch}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped cost-table">
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                S No.
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                Username
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                Creation Date
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                MFA
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                Last login
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                Console Access
              </th>
              <th
                style={{
                  backgroundColor: "rgba(95, 30, 190, 1)",
                  color: "#eee",
                }}
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
         
          {loading ? (
            <tbody className="table-group-divider">
              {new Array(10).fill("placeholder").map((item, index) => (
                <tr key={`${item}-${index}`}>
                  <th scope="row " className="placeholder-glow">
                    <span className="placeholder w-50"></span>
                  </th>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                  <td className="placeholder-glow">
                    <span className="placeholder w-100"></span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="table-group-divider">
              {users.map((item, index) => (
                <tr key={item.Username}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.Username}</td>
                  <td>
                    {moment(new Date(item["Creation Date"])).format(
                      "DD-MM-yyyy"
                    )}
                  </td>
                  <td
                    style={{
                      color: !item["MFA Enabled"] ? "#ff0000" : "green",
                    }}
                  >
                    {item["MFA Enabled"] ? "Yes" : "No"}
                  </td>
                  <td
                    style={{ color: item["Last Login"] === "N/A" && "#ff0000" }}
                  >
                    {item["Last Login"] === "N/A"
                      ? "Never logged In"
                      : moment(new Date(item["Last Login"])).format(
                          "DD-MM-yyyy HH:mm"
                        )}{" "}
                  </td>
                  <td
                    style={{
                      color: !item["Console Access Enabled"] && "#ff0000",
                    }}
                  >
                    {item["Console Access Enabled"] ? "Enabled" : "Disabled"}
                  </td>
                  <td>
                    <div
                      className="btn btn-sm btn-primary"
                      //   onClick={() => navigate(`edit/${item._id}`)}
                    >
                      edit
                    </div>
                    <div className="btn btn-sm btn-danger mx-1">delete</div>
                    <div className="btn btn-sm btn-secondary mx-1">reset</div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {users.length===0 && <h2 className="text-center text-secondary">No Records found</h2>}
      </div>
    </div>
  );
};

export default IAMUsers;
