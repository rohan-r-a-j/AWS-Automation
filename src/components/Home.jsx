import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChartComponent from "./PieChart";
const Home = React.memo(() => {
  let [userData, setUserData] = useState({});
  let [loading, setLoading] = useState(false);
  let [instances, setInstances] = useState({});
  function findInstanceCount() {
    let lambdaFunURL = "https://ea2o6hzj4u3afffie2hkfcnr6u0couos.lambda-url.us-east-1.on.aws/";

   if(Object.keys(instances).length===0){
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
          //   localStorage.setItem("users", JSON.stringify(res));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
   }
  }

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
  useEffect(useCallback(() => {
    let users = JSON.parse(localStorage.getItem("users"));

    console.log();
    if (users) {
      setUserData(users)
    //   findInstanceCount();
    } else {
      fetchUsers();
    //   findInstanceCount()
    }
    
  }), []);
  return (
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
              <div className="d-grid">
                <Link
                  to={"/get-instance-details"}
                  className="btn btn-outline-warning "
                >
                  Explore cost
                </Link>
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
            <div className="card-body d-flex flex-column justify-content-between ">
              <h5 className="card-title">Get Instance Details Through ID</h5>
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
                      10000
                    </div>
                    <h4 className="text-center">EC2 Instances</h4>
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
                </div>
              </div>
              <Link
                to={"/get-instance-details"}
                className="btn btn-outline-warning "
              >
                Go somewhere
              </Link>
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
              <div className="d-grid">
                <Link
                  to={"/get-instance-details"}
                  className="btn btn-outline-warning "
                >
                  Explore cost
                </Link>
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
            <div className="card-body d-flex flex-column justify-content-between ">
              <h3
                style={{ textDecoration: "underline" }}
                className="card-title"
              >
                User Details
              </h3>
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
                <div className="d-flex flex-row justify-content-end align-items-center mb-2">
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
              </div>
              {/* <Link
                to={"/get-instance-details"}
                className="btn btn-outline-warning "
              >
                Go somewhere
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
