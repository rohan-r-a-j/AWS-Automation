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
                User Name:
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="example: email@hcl.com"
              ></input>
            </div>

            <div className="col-6 mb-3">
              <div className="group-picker">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Select Groups:
                </label>
                <input
                  onFocus={handelFocus}
                  name="groups"
                  className="form-control "
                  placeholder="Select"
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
            <label className="form-check-label short-label-manual" htmlFor="exampleCheck1">
            I Understand the <span style={{color: "blue"}} >Terms & Conditions</span> and am aware of the <span style={{color: "red"}} > Groups & Permissions</span> provided to the user.
            </label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
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
        <a className="text-right" href={`mailto:${response.username}?subject=Welcome%20to%20AWS-%20Important%20Account%20Information%20and%20Guidelines!&body=Dear%20User,%0D%0A%0D%0AWelcome%20to%20Amazon%20Web%20Services%20(AWS)!%20As%20part%20of%20our%20team,%20you%20now%20have%20access%20to%20a%20wide%20range%20of%20cloud%20services%20and%20resources.%20Attached%20is%20console%20login%20credentials%20for%20you.%0D%0A%0D%0ATo%20ensure%20a%20smooth%20and%20secure%20experience,%20please%20take%20note%20of%20the%20following%20important%20account%20guidelines.%0D%0A%0D%0ABasic%20Guidelines:%0D%0A%0D%0A1.Enabling%20Multi-Factor%20Authentication%20(MFA):%20For%20enhanced%20security,%20enabling%20MFA%20on%20your%20account%20is%20mandatory.%20MFA%20adds%20an%20extra%20layer%20of%20protection%20on%20top%20of%20your%20username%20and%20password.%20Please%20set%20this%20up%20as%20soon%20as%20possible%20as%20you%E2%80%99ll%20not%20be%20able%20to%20access%20any%20resource%20unless%20enabled.%0D%28Attached%20is%20the%20SOP%20for%20the%20same%20for%20your%20reference.%29%0D%0A%0D%0A2.Tagging%20Resources:%20It%20is%20essential%20to%20tag%20all%20your%20AWS%20resources%20with%20your%20name.%20Tagging%20helps%20in%20identifying%20and%20managing%20resources%20effectively.%20Please%20note,%20resources%20that%20are%20not%20appropriately%20tagged%20with%20your%20name%20will%20be%20subject%20to%20deletion%20during%20our%20periodic%20reviews.%0D%0A%0D%0A3.%20Please%20Stop%20or%20delete%20your%20resources%20when%20not%20in%20use.%0D%0A%0D%0AIn%20case%20you%20need%20additional%20permissions,%20encounter%20any%20issues%20or%20have%20questions,%20feel%20free%20to%20write%20to%20us%20at%20aws-admins@hcl.com.%0D%0A%0D%0AThank%20You%20For%20Your%20Cooperation%0AHCLTech%20ERS%20AWS%20Administration%20Team`}>             <button className="btn btn-outline-secondary">E-mail Sign In Instructions &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
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
