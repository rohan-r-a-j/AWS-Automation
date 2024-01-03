import { useState } from "react";

function ResourceUtilsComponent({
  instanceConfig,
  handleCardApiCall,
  resourceDetails,
  instances,
}) {
  let [loading, setLoading] = useState(false);
  return (
    <div
      className="card"
      style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
    >
      {/* <img src="..." class="card-img-top" alt="..." /> */}
      <div className="card-body d-flex flex-column justify-content-between ">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h5 className="card-title">Resource Utilization Overview</h5>
          <button
            onClick={() =>
              instanceConfig.forEach((item) =>
                handleCardApiCall(item.type, setLoading)
              )
            }
            type="button"
            className="btn "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              fill="currentColor"
              className={"bi bi-arrow-repeat " + (loading ? "rotate" : "")}
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
                className={"card " + [item.flip ? "flip" : ""].join(" ")}
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: 4 / 3,
                }}
              >
                {/* <button
                onClick={() => handleCardApiCall(item.type,setLoading)}
                type="button"
                className="btn "
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 3,
                }}
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
              </button> */}
                <div className="flip-inner">
                  <div
                    className={
                      "card-body " + [item.flip ? "front" : ""].join(" ")
                    }
                  >
                    <div
                      className={"text-center " + item.classNames.join(" ")}
                      style={{ fontSize: "5rem", fontWeight: "bold" }}
                    >
                      {resourceDetails[item.dataKey.toString()]}
                    </div>
                    <h4 className="text-center">{item.label}</h4>
                  </div>
                  {item.flip && (
                    <div className="card-body back">
                      <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <div className="card p-2">
                          <h3 className="text-success">
                            Running: {instances["Running EC2"]}
                          </h3>

                          <h3 className="text-danger">
                            Stopped: {instances["Stopped EC2"]}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ResourceUtilsComponent;
