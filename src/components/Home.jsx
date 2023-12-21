
import React, {  useEffect, useState } from "react";

import PieChartComponent from "./PieChart";

let instanceConfig = [
  {
    label: "EC2 Instances",
    classNames: ["text-primary"],
    dataKey: "Total EC2",
    type: "ec2",
  },
  {
    label: "EKS Cluster",
    classNames: ["text-warning"],
    dataKey: "EKS",
    type: "eks_cluster",
  },
  {
    label: "RDS Cluster",
    classNames: ["text-success"],
    dataKey: "RDS",
    type: "rds",
  },
  {
    label: "S3 Buckets",
    classNames: ["text-danger"],
    dataKey: "S3",
    type: "s3"
  },
];

const Home = React.memo(() => {
  let [userData, setUserData] = useState({});
  let [loading, setLoading] = useState(false);
  let [instances, setInstances] = useState({});
  let [resourceDetails, setResourceDetails] = useState({});

  function fetchUsers() {
    // let instanceId =queryParams.get('instance_id')
    let lambdaFunctionURL = `https://i224nzjimzdnmnbthtw66ypun40hglvr.lambda-url.us-east-1.on.aws/`;
    setLoading(true);
    fetch(lambdaFunctionURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed,
      },
      // body:JSON.stringify({ instance_id: instanceId })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        setUserData(res);
        console.log(res);
        localStorage.setItem("users", JSON.stringify(res));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  //   Total EKS- https://3ion5ldlftfrqbqwsnnpoxswlm0uiupw.lambda-url.us-east-1.on.aws/
  // Total S3- https://f3wjptwrgzwpbxt4po5cjrgrcu0wbdal.lambda-url.us-east-1.on.aws/
  // Total RDS- https://2kiedl7rgvlchcdhypekeioo2i0mgele.lambda-url.us-east-1.on.aws/
  function handleCardApiCall(action) {
    switch (action) {
      case "ec2":
        console.log("Calling EC Fetch API");
        fetch(
          "https://ea2o6hzj4u3afffie2hkfcnr6u0couos.lambda-url.us-east-1.on.aws/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed,
            },
            // body:JSON.stringify({ instance_id: instanceId })
          }
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);
            console.log(res);
            setResourceDetails((prev) => {
              prev["Total EC2"] = res["Total EC2"];
              console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });
            console.log(res);
            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        break;

      case "eks_cluster":
        console.log("Calling EKS Fetch API");
        fetch(
          "https://3ion5ldlftfrqbqwsnnpoxswlm0uiupw.lambda-url.us-east-1.on.aws/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed,
            },
            // body:JSON.stringify({ instance_id: instanceId })
          }
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);
            console.log(res);
            setResourceDetails((prev) => {
              prev["EKS"] = res["EKS"];
              console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });
            console.log(res);
            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        break;

      case "rds":
        console.log("Calling RDS Fetch API");
        fetch(
          "https://2kiedl7rgvlchcdhypekeioo2i0mgele.lambda-url.us-east-1.on.aws/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed,
            },
            // body:JSON.stringify({ instance_id: instanceId })
          }
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);
            console.log(res);
            setResourceDetails((prev) => {
              prev["RDS"] = res["RDS"];
              console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });
            console.log(res);
            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        break;

      case "s3":
        console.log("Calling S3 Fetch API");
        fetch(
          "https://f3wjptwrgzwpbxt4po5cjrgrcu0wbdal.lambda-url.us-east-1.on.aws/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed,
            },
            // body:JSON.stringify({ instance_id: instanceId })
          }
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);
            console.log(res);
            setResourceDetails((prev) => {
              prev["S3"] = res["S3"];
              console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });
            console.log(res);
            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        break;

      default:
        break;
    }
  }
  let findInstanceCount = () => {
    let lambdaFunURL =
      "https://ea2o6hzj4u3afffie2hkfcnr6u0couos.lambda-url.us-east-1.on.aws/";

    setLoading(true);
    fetch(lambdaFunURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed,
      },
      // body:JSON.stringify({ instance_id: instanceId })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        setInstances(res);
        console.log(res);
        localStorage.setItem("instances", JSON.stringify(res));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log("call effect");

    let users = JSON.parse(localStorage.getItem("users"));
    let instancesCount = JSON.parse(localStorage.getItem("instances"));
    let resources = JSON.parse(localStorage.getItem("resourceDetails"));
    if (resources) setResourceDetails(resources)
    else {
      instanceConfig.forEach(item => handleCardApiCall(item.type))
    };
    if (instancesCount) {
      setInstances(instancesCount);
    } else {
      findInstanceCount();
    }
    if (users) {
      setUserData(users);
    } else {
      fetchUsers();
    }
  }, []);
  return (
    <>
      <br />
      <h2>Global Dashboard</h2>
      <br />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row  row-gap-3">
          <div className="col-6">
            <div
              className="card"
              style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
            >
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div className="card-body d-flex flex-column justify-content-between">
                <h3 className="card-title">Total cost Till Date</h3>
                <h6>$ 10,000</h6>
                <div className="d-grid"></div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className="card"
              style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
            >
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div className="card-body d-flex flex-column justify-content-between ">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h5 className="card-title">
                    Get Instance Details Through ID
                  </h5>
                  <button
                    onClick={findInstanceCount}
                    type="button"
                    className="btn "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      fill="currentColor"
                      className={
                        "bi bi-arrow-repeat " + (loading ? "rotate" : "")
                      }
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                      <path
                        fillRule="evenodd"
                        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="row row-gap-2 custom-row">
                  {instanceConfig.map((item) => (
                    <div key={item.label} className="col-6">
                      {" "}
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 4 / 3,
                        }}
                      >
                        <div
                          className={"text-center " + item.classNames.join(" ")}
                          style={{ fontSize: "5rem", fontWeight: "bold" }}
                        >
                          {resourceDetails[item.dataKey.toString()]}
                        </div>
                        <h4 className="text-center">{item.label}</h4>
                        <button
                          onClick={() => handleCardApiCall(item.type)}
                          type="button"
                          className="btn "
                          style={{ position: "absolute", bottom: 0, right: 0 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            fill="currentColor"
                            className={
                              "bi bi-arrow-repeat " + (loading ? "rotate" : "")
                            }
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                            <path
                              fillRule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* <div className="col-6">
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: 4 / 3,
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="text-center text-warning "
                        style={{ fontSize: "5rem", fontWeight: "bold" }}
                      >
                        10{" "}
                      </div>
                      <h4 className="text-center">EKS Cluster</h4>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: 4 / 3,
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="text-center text-success "
                        style={{ fontSize: "5rem", fontWeight: "bold" }}
                      >
                        10{" "}
                      </div>
                      <h4 className="text-center">RDS Instances</h4>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: 4 / 3,
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="text-center text-danger "
                        style={{ fontSize: "5rem", fontWeight: "bold" }}
                      >
                        10{" "}
                      </div>
                      <h4 className="text-center">S3 Buckets</h4>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className="card"
              style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
            >
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div className="card-body d-flex flex-column justify-content-between">
                <h3 className="card-title">cost analysis</h3>
                <PieChartComponent />
                <div className="d-grid"></div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className="card"
              style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
            >
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div className="card-body d-flex flex-column justify-content-between ">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h3
                    style={{ textDecoration: "underline" }}
                    className="card-title"
                  >
                    User Details
                  </h3>
                  <button onClick={fetchUsers} type="button" className="btn ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      fill="currentColor"
                      className={
                        "bi bi-arrow-repeat " + (loading ? "rotate" : "")
                      }
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                      <path
                        fillRule="evenodd"
                        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                      ></path>
                    </svg>
                  </button>
                </div>

                {/* <hr /> */}
                <div className="row row-gap-2 custom-row">
                  <div className="col-6">
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="text-center text-primary "
                        style={{ fontSize: "5rem", fontWeight: "bold" }}
                      >
                        {userData.TotalUsers}
                      </div>
                      <h4 className="text-center">Total Users</h4>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 4 / 3,
                        }}
                      >
                        <div
                          className="text-center text-warning "
                          style={{ fontSize: "5rem", fontWeight: "bold" }}
                        >
                          {userData.NonMFAUsers}{" "}
                        </div>
                        <h4 className="text-center">Non MFA Users</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 4 / 3,
                        }}
                      >
                        <div
                          className="text-center text-success "
                          style={{ fontSize: "5rem", fontWeight: "bold" }}
                        >
                          {userData.InactiveUsers}{" "}
                        </div>
                        <h4 className="text-center">Inactive Users</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="card"
                      style={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: 4 / 3,
                      }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 4 / 3,
                        }}
                      >
                        <div
                          className="text-center text-danger "
                          style={{ fontSize: "5rem", fontWeight: "bold" }}
                        >
                          {userData.AdminUsers}{" "}
                        </div>
                        <h4 className="text-center">Admin Users</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Home;
