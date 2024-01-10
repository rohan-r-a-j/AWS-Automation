import React, { useContext, useEffect, useState } from "react";
import "./styles/loader.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";
import { StateContext } from "../context/state";
let mailBody = `Dear User,
 
Welcome to Amazon Web Services (AWS)! As part of our team, you now have access to a wide range of cloud services and resources. Attached is console login credentials for you.
 
To ensure a smooth and secure experience, please take note of the following important account guidelines.
 
Basic Guidelines:
 
1.Enabling Multi-Factor Authentication (MFA): For enhanced security, enabling MFA on your account is mandatory. MFA adds an extra layer of protection on top of your username and password. Please set this up as soon as possible as you’ll not be able to access any resource unless enabled. (Attached is the SOP for the same for your reference.)
 
2.Tagging Resources: It is essential to tag all your AWS resources with your name. Tagging helps in identifying and managing resources effectively. Please note, resources that are not appropriately tagged with your name will be subject to deletion during our periodic reviews.
 
3. Please Stop or delete your resources when not in use.
 
In case you need additional permissions, encounter any issues or have questions, feel free to write to us at aws-admins@hcl.com.
 
Thank You For Your Cooperation
HCLTech ERS AWS Administration Team  `;
const CreateIAMUser = () => {
  let [state, dispatch] = useContext(StateContext);
  let [loading, setLoading] = useState(false);
  let [showList, setShowList] = useState(false);
  let [selectedGroups, setSelectedGroups] = useState([]);
  let [response, setResponse] = useState(null);
  let [modal, setModal] = useState(false);
  let [cp, setCp] = useState(null);
  let [groups, setGroups] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/aws/lambda/run`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        name: "iam_groups",
        account: state.currentAccount,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setGroups(data);
      })
      .catch((err) => {
        console.log(err);
        toast(err.message, {
          theme: "colored",
          type: "error",
          draggable: false,
          position: "bottom-right",
        });
      });
  }, []);
  function onSubmit(e) {
    e.preventDefault();
    let { username } = e.target.elements;

    setLoading(true);
    fetch(`${baseUrl}/aws/lambda/run`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
      method: "POST",
      body: JSON.stringify({
        name: "create_iam_user",
        account: state.currentAccount,
        params: {
          username: username.value,
          groupnames: selectedGroups.join(","),
        },
      }),
    })
      .then((res) => {
        // if(!res.ok) throw new Error(res.statusText)
        return res.json();
      })
      .then((data) => {
        if (data.error_message) {
          throw new Error(data.error_message);
        }

        toast(data.message, {
          draggable: false,
          position: "bottom-right",
          type: "success",
          theme: "colored",
        });
        setResponse(data);
        setModal(true);
        setLoading(false);
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
  function handelFocus() {
    // console.log('focused')
    setShowList(true);
  }
  function download() {
    fetch(`${baseUrl}/aws/csv`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        csv: {
          sign_in_url: response.sign_in_url,
          username: response.username,
          password: response.password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.blob();
      })
      .then((blob) => {
        if (blob !== null) {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = `${response.username}_credentials.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          toast("successfully downloaded", {
            theme: "colored",
            type: "success",
            draggable: false,
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.message, {
          theme: "colored",
          type: "error",
          draggable: false,
          position: "bottom-right",
        });
      });
  }
  function handelCheckbox(e) {
    if (e.target.checked) {
      setSelectedGroups((prev) => [...prev, e.target.value]);
    } else {
      setSelectedGroups((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    }

  }
  return (
    <div
      style={{ height: "100%" }}
      className="d-flex flex-row justify-content-center align-items-center"
    >
      {showList && (
        <div
          onClick={() => setShowList(false)}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        ></div>
      )}
      <div
        className="card w-50 p-4 my-4"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <form onSubmit={onSubmit}>
          <h4>Create a new IAM User</h4>
          <hr />
          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                User name
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
              ></input>
            </div>

            <div className="col-6 mb-3">
              <div className="group-picker">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Choose Groups
                </label>
                <input
                  onFocus={handelFocus}
                  name="groups"
                  className="form-control "
                ></input>
                {showList && (
                  <>
                    <ul
                      style={{
                        zIndex: 100000,
                        position: "absolute",
                        width: "100%",
                        // top: 0,
                        // left: 0,
                        height: "10rem",
                      }}
                      className="list-group"
                    >
                      {groups.groupNames.map((item, i) => (
                        <li key={i} className="list-group-item">
                          <input
                            checked={selectedGroups.includes(item)}
                            onChange={handelCheckbox}
                            name="group"
                            value={item}
                            type="checkbox"
                          ></input>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="col-12">
              {selectedGroups.map((item, i) => (
                <div className="badge bg-warning m-1">{item}</div>
              ))}
            </div>
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
              type="button"
              onClick={() => navigate(-1)}
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
      {modal && (
        <div className="backdrop d-flex flex-row justify-content-center align-items-center">
          <div style={{ zIndex: 12 }} className="card p-4 w-50 ">
            
          <div className="d-flex flex-row justify-content-between">
          <h3 className="card-title text-left">Console Sign In Details</h3>
          <a
            className="text-right"
              href={`mailto:${
                response.username
              }&Subject=Welcome to AWS - Important Account Information and Guidelines&body=${encodeURIComponent(
                mailBody
              )}`}
            >
              <button className="btn btn-outline-secondary">E-mail Sign In Instructions &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg></button>
            </a>
          </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <div className="text-secondary">Username:</div>

                <div>
                  {cp === response.username && "Copied"}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(response.username);
                      setCp(response.username);
                      setTimeout(() => {
                        setCp(null);
                      }, 3000);
                    }}
                    type="button"
                    className="btn btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-copy"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </button>
                  {response.username}
                </div>
              </div>
              <div className="col-6">
                <div className="text-secondary">Password:</div>
                <div>
                  {cp === response.password && "Copied"}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(response.password);
                      setCp(response.password);
                      setTimeout(() => {
                        setCp(null);
                      }, 3000);
                    }}
                    type="button"
                    className="btn btn-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-copy"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </button>
                  {response.password
                    .split("")
                    .map((item) => "*")
                    .join("")}
                </div>
              </div>
              <div className="col-12">
                <div className="text-secondary">Console url:</div>
                <div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(response.sign_in_url);
                      setCp(response.sign_in_url);
                      setTimeout(() => {
                        setCp(null);
                      }, 3000);
                    }}
                    type="button"
                    className="btn btn-sm"
                  >
                    {cp === response.sign_in_url && "Copied"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-copy"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </button>
                  <a href={response.sign_in_url}>{response.sign_in_url}</a>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <button
                onClick={() => {
                  navigate(-1);
                  sessionStorage.removeItem("iam_users");
                }}
                className="btn btn-outline-dark"
              >
                Back to IAM Users
              </button>
              <button onClick={download} className="btn btn-dark">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>{" "}
                Downlaod as csv
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateIAMUser;
