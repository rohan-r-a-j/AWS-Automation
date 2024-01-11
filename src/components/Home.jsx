import React, { useContext, useEffect, useState } from "react";
import moment from "moment/moment";
import CostCardComponent from "./CostCard";
import ResourceUtilsComponent from "./ResourceUtils";
import CostTrendComponent from "./CostTrend";
import UserDetailsComponent from "./UserDetails";
import Top7ServicesComponent from "./Top7Services";
import CountryViewComponent from "./CountryView";
import { StateContext } from "../context/state";
import { baseUrl } from "../utils/utils";
import { toast } from "react-toastify";

let nodeApi = `${baseUrl}/aws/lambda/run`;
let instanceConfig = [
  {
    label: "EC2 Instances",
    classNames: ["text-primary"],
    dataKey: "Total EC2",
    type: "ec2",
    flip: true,
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
    type: "s3",
  },
];
// let accountApiConfig = {
//   "051650638025": [
//     {
//       key: "ec2",
//       apiUrl:
//         "https://ea2o6hzj4u3afffie2hkfcnr6u0couos.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "eks_cluster",
//       apiUrl:
//         "https://3ion5ldlftfrqbqwsnnpoxswlm0uiupw.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "rds",
//       apiUrl:
//         "https://2kiedl7rgvlchcdhypekeioo2i0mgele.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "s3",
//       apiUrl:
//         "https://f3wjptwrgzwpbxt4po5cjrgrcu0wbdal.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "top_7_service_data",
//       apiUrl:
//         "https://uiwbbi25clx4enlmvohblsszxa0pcqoa.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "reg_cost",
//       apiUrl:
//         "https://ux4rlttlwsceskaleaxzm5pyci0mqhua.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "compare_cost",
//       apiUrl:
//         "https://7oofpr4fxbh52maft7khgji72m0sxrmx.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "fetchuser",
//       apiUrl:
//         "https://i224nzjimzdnmnbthtw66ypun40hglvr.lambda-url.us-east-1.on.aws/",
//     },
//   ],
//   388328004932: [
//     {
//       key: "ec2",
//       apiUrl:
//         "https://rjrze24z6imhpjxiovm56miu4u0ivssa.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "eks_cluster",
//       apiUrl:
//         "https://ltdzramvfc4tl2sqdexb26wnqy0uyegy.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "rds",
//       apiUrl:
//         "https://c6pdlv3dhexbqws4yvjs2dvcne0jcvsv.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "s3",
//       apiUrl:
//         "https://wmrk55bttl2oa3ewr4jrkq54fy0mdkun.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "top_7_service_data",
//       apiUrl:
//         "https://6vtwz5qinfrcovlir47gfutcm40remay.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "reg_cost",
//       apiUrl: "",
//     },
//     {
//       key: "compare_cost",
//       apiUrl:
//         "https://3ra33pjg3tychzzizbhprukyma0gtkro.lambda-url.us-east-1.on.aws/",
//     },
//     {
//       key: "fetchuser",
//       apiUrl:
//         "https://fxauudfplvvdqztn4ttox4i4be0udwbs.lambda-url.us-east-1.on.aws/",
//     },
//   ],
// };

const Home = React.memo(() => {
  let [state, dispatch] = useContext(StateContext);
  let { currentAccount } = state;
  let [userData, setUserData] = useState({});
  // let [loading, setLoading] = useState(false);
  let [instances, setInstances] = useState({});
  let [resourceDetails, setResourceDetails] = useState({});
  let [costDetails, setCostDetails] = useState({});
  let [date, setDate] = useState(null);
  let [costChartData, setCostChartData] = useState({});
  let [compareCostData, setCompareCostData] = useState({});
  let [tabIndex, setTabIndex] = useState(0);
  let [switchLoading, setSwitchLoading] = useState(false);
  let [currentApiConfig, setCurrentApiConfig] = useState(state.currentAccount);
  let [token, setToken] = useState(sessionStorage.getItem('token'));
  let [lodingContext, setLoadingContext] = useState({ undefined: true });

  //   Total EKS- https://3ion5ldlftfrqbqwsnnpoxswlm0uiupw.lambda-url.us-east-1.on.aws/
  // Total S3- https://f3wjptwrgzwpbxt4po5cjrgrcu0wbdal.lambda-url.us-east-1.on.aws/
  // Total RDS- https://2kiedl7rgvlchcdhypekeioo2i0mgele.lambda-url.us-east-1.on.aws/
  function handleCardApiCall(action, setLoading) {
    setLoading(true);
    switch (action) {
      case "ec2":
        //console.log("Calling EC Fetch API");
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            setResourceDetails((prev) => {
              prev["Total EC2"] = res["Total EC2"];

              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });
            setInstances(res);

            localStorage.setItem("instances", JSON.stringify(res));
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "eks_cluster":
        //console.log("Calling EKS Fetch API");
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setResourceDetails((prev) => {
              prev["EKS"] = res["EKS"];
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              let date = new Date().toString();
              localStorage.setItem("updatedAt", date);
              setDate(date);
              return { ...prev };
            });

            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "rds":
        //console.log("Calling RDS Fetch API");
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setResourceDetails((prev) => {
              prev["RDS"] = res["RDS"];
              //console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              return { ...prev };
            });

            //   localStorage.setItem("instances", JSON.stringify(res));
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "s3":
        //console.log("Calling S3 Fetch API");
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        setLoading(true);
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setResourceDetails((prev) => {
              prev["S3"] = res["S3"];
              //console.log("state", prev);
              localStorage.setItem("resourceDetails", JSON.stringify(prev));
              let date = new Date().toString();
              localStorage.setItem("updatedAt", date);
              setDate(date);
              return { ...prev };
            });

            //   localStorage.setItem("instances", JSON.stringify(res));
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "top_7_service_data":
        //console.log("Calling TOP-7 Services Cost Fetch API");
        setLoading(true);
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setCostDetails(res);

            localStorage.setItem("costDetails", JSON.stringify(res));
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "reg_cost":
        //console.log("Calling Region Cost Fetch API");
        setLoading(true);
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setCostChartData(res);

            localStorage.setItem("costChartData", JSON.stringify(res));
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err.toString());
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      case "compare_cost":
        //console.log("Calling Compare Cost API");
        setLoading(true);
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((res) => {
            //   setInstances(res);

            setCompareCostData(res);

            localStorage.setItem("compareCostData", JSON.stringify(res));
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;
      case "fetchuser":
        //console.log("Calling Compare Cost API");
        setLoading(true);
        setLoadingContext((prev) => ({ ...prev, [action]: true }));
        fetch(nodeApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            // Add any additional headers if needed,
          },
          body: JSON.stringify({ name: action, account: state.currentAccount }),
        })
          .then((response) => {
            //console.log(response);
            return response.json();
          })
          .then((res) => {
            setUserData(res);

            localStorage.setItem("users", JSON.stringify(res));
            setLoading(false);
            let date = new Date().toString();
            localStorage.setItem("updatedAt", date);
            setDate(date);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setLoadingContext((prev) => ({ ...prev, [action]: false }));
          });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    console.log("call effect");
    if (localStorage.getItem("accountId")) {
      dispatch({
        type: "changeAccount",
        payload: { currentAccount: localStorage.getItem("accountId") },
      });
    }
    let users = JSON.parse(localStorage.getItem("users"));
    let instancesCount = JSON.parse(localStorage.getItem("instances"));
    let resources = JSON.parse(localStorage.getItem("resourceDetails"));
    // let costs = JSON.parse(localStorage.getItem("costDetails"));
    let updatedAt = localStorage.getItem("updatedAt");
    // let costChart = JSON.parse(localStorage.getItem("costChartData"));
    // let compCost = JSON.parse(localStorage.getItem("compareCostData"));
    if (instancesCount) setInstances(instancesCount);
    else handleCardApiCall("ec2", setSwitchLoading);
    handleCardApiCall("compare_cost", setSwitchLoading);
    handleCardApiCall("reg_cost", setSwitchLoading);
    if (updatedAt) setDate(updatedAt);
    if (resources) setResourceDetails(resources);
    else {
      instanceConfig.forEach((item) =>
        handleCardApiCall(item.type, setSwitchLoading)
      );
    }
    handleCardApiCall("top_7_service_data", setSwitchLoading);

    if (users) {
      setUserData(users);
    } else {
      // fetchUsers();
      handleCardApiCall("fetchuser", setSwitchLoading);
    }
  }, [currentApiConfig]);

  useEffect(() => {
    //console.log("state change", state, localStorage.getItem("accountId"));
    setSwitchLoading(true);
    setCurrentApiConfig(state.currentAccount);
    if (!localStorage.getItem("accountId")) {
      localStorage.setItem("accountId", state.currentAccount);
      setSwitchLoading(false);
    } else if (state.currentAccount !== localStorage.getItem("accountId")) {
      setSwitchLoading(false);
    } else {
      setSwitchLoading(false);
    }
  }, [currentAccount]);

  let accountsConfig = {
    "051650638025": [
      {
        component: (
          <CostCardComponent
            handleCardApiCall={handleCardApiCall}
            costDetails={costDetails}
          />
        ),
        colStyle: "col-6",
        dataKey: "top_7_service_data",
      },
      {
        component: (
          <ResourceUtilsComponent
            resourceDetails={resourceDetails}
            instances={instances}
            handleCardApiCall={handleCardApiCall}
            instanceConfig={instanceConfig}
          />
        ),
        colStyle: "col-6",
        dataKey: ["ec2", "rds", "eks", "s3"],
      },
      {
        component: (
          <CostTrendComponent
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            compareCostData={compareCostData}
            handleCardApiCall={handleCardApiCall}
          />
        ),
        colStyle: "col-6",
        dataKey: "compare_cost",
      },

      {
        component: (
          <UserDetailsComponent
            userData={userData}
            handleCardApiCall={handleCardApiCall}
          />
        ),
        colStyle: "col-6",
        dataKey: "fetchuser",
      },
      {
        component: <Top7ServicesComponent costDetails={costDetails} />,
        colStyle: "col-12",
        dataKey: "top_7_service_data",
      },
      {
        component: <CountryViewComponent costChartData={costChartData} />,
        colStyle: "col-12",
        dataKey: "reg_cost",
      },
    ],
    388328004932: [
      {
        component: (
          <CostCardComponent
            handleCardApiCall={handleCardApiCall}
            costDetails={costDetails}
          />
        ),
        colStyle: "col-6",
        dataKey: "top_7_service_data",
      },
      {
        component: (
          <ResourceUtilsComponent
            resourceDetails={resourceDetails}
            instances={instances}
            handleCardApiCall={handleCardApiCall}
            instanceConfig={instanceConfig}
          />
        ),
        colStyle: "col-6",
        dataKey: ["ec2", "rds", "eks", "s3"],
      },
      {
        component: (
          <CostTrendComponent
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            compareCostData={compareCostData}
            handleCardApiCall={handleCardApiCall}
          />
        ),
        colStyle: "col-6",
        dataKey: "compare_cost",
      },

      {
        component: (
          <UserDetailsComponent
            userData={userData}
            handleCardApiCall={handleCardApiCall}
          />
        ),
        colStyle: "col-6",
        dataKey: "fetchuser",
      },
      {
        component: <Top7ServicesComponent costDetails={costDetails} />,
        colStyle: "col-12",
        dataKey: "top_7_service_data",
      },
      {
        component: <CountryViewComponent costChartData={costChartData} />,
        colStyle: "col-12",
        dataKey: "reg_cost",
      },
    ],
  };

  // if (switchLoading) return <h1>Loading</h1>;
  return (
    <>
      <br />
      <div className="d-flex px-5 flex-row justify-content-between align-items-center">
        <h2
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bolder",
            fontSize: "1.8rem",
            border: "none",
            color: "#244",
            letterSpacing: "4px",
            borderBottom: "solid 5px rgba(95, 30, 190, 1)",
          }}
        >
          {" "}
          Admin Dashboard
        </h2>
        <span style={{ color: "#444" }}>
          Last Updated: <b>{moment(new Date(date)).fromNow()}</b>
        </span>
      </div>
      <br />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row  row-gap-3" style={{ width: "100%" }}>
          {accountsConfig[state.currentAccount].map((item, i) =>
            (item.dataKey instanceof Array &&
              item.dataKey.some((item) => lodingContext[item])) ||
            lodingContext[item.dataKey] ? (
              <div className={item.colStyle} key={i}>
                {item.dataKey instanceof Array ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="row  p-2 row-gap-2">
                        {item.dataKey.map((item, i) => (
                          <div
                            key={i}
                            className="col-6 card placeholder-wave my-2 p-4"
                          >
                            <h5 className="card-title placeholder-wave">
                              <span
                                style={{ height: "3rem" }}
                                className="placeholder col-6"
                              ></span>
                            </h5>
                            <p className="card-text placeholder-wave">
                              <span className="placeholder col-4"></span>

                              <span className="placeholder col-8"></span>
                            </p>
                            <p className="card-text placeholder-wave">
                              <span className="placeholder col-4"></span>

                              <span className="placeholder col-8"></span>
                            </p>
                            <p className="card-text placeholder-wave">
                              <span className="placeholder col-4"></span>

                              <span className="placeholder col-8"></span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="card"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: 4 / 3,
                    }}
                    key={i}
                    aria-hidden="true"
                  >
                    <div className="card-body">
                      <h5 className="card-title placeholder-wave">
                        <span
                          style={{ height: "2rem", borderRadius: "4px" }}
                          className="placeholder col-6"
                        ></span>
                      </h5>
                      <p className="card-text placeholder-wave">
                        <span className="placeholder col-4"></span>

                        <span className="placeholder col-8"></span>
                      </p>
                      <p className="card-text placeholder-wave">
                        <span className="placeholder col-4"></span>

                        <span className="placeholder col-8"></span>
                      </p>
                      <p className="card-text placeholder-wave">
                        <span className="placeholder col-4"></span>

                        <span className="placeholder col-8"></span>
                      </p>
                      <p className="card-text placeholder-wave">
                        <span className="placeholder col-4"></span>

                        <span className="placeholder col-8"></span>
                      </p>
                      <p className="card-text placeholder-wave">
                        <span className="placeholder col-4"></span>

                        <span className="placeholder col-8"></span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div key={i} className={item.colStyle}>
                {item.component}
              </div>
            )
          )}
          {/* <div className="col-6">
            <CostCardComponent
              loading={loading}
              handleCardApiCall={handleCardApiCall}
              costDetails={costDetails}
            />
          </div>
          <div className="col-6">
            <ResourceUtilsComponent
              resourceDetails={resourceDetails}
              instances={instances}
              handleCardApiCall={handleCardApiCall}
              findInstanceCount={findInstanceCount}
              instanceConfig={instanceConfig}
              loading={loading}
            />
          </div>
          <div className="col-6">
            <CostTrendComponent
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              compareCostData={compareCostData}
              loading={loading}
            />
          </div>
          <div className="col-6">
            <UserDetailsComponent userData={userData} fetchUsers={fetchUsers} />
          </div>
          <div className="col-12">
            <Top7ServicesComponent costDetails={costDetails} />
          </div>
          <div className="col-12">
            <CountryViewComponent costChartData={costChartData} />
          </div> */}
        </div>
      </div>
    </>
  );
});

export default Home;
