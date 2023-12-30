import BarChart from "./BarChart";
import { barChartKey, reorganizeCosts } from "../utils/utils";
import { useState } from "react";
function CostTrendComponent({
  setTabIndex,
  tabIndex,
  compareCostData,
  handleCardApiCall,
}) {
  let [loading, setLoading] = useState(false);

  return (
    <div
      className="card"
      style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
    >
      {/* <img src="..." class="card-img-top" alt="..." /> */}

      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h3 className="card-title">Monthly Cost Trend</h3>
          <button
            onClick={() => handleCardApiCall("compare_cost", setLoading)}
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

        <div className="d-flex flex-row justify-content-start">
          <span
            onClick={() => setTabIndex(0)}
            className={"tab " + [tabIndex == 0 ? "active" : ""].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bar-chart-line-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z" />
            </svg>
          </span>
          <span
            onClick={() => setTabIndex(1)}
            className={"tab " + [tabIndex == 1 ? "active" : ""].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-table"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
            </svg>
          </span>
        </div>
        {tabIndex === 0 && <BarChart data={compareCostData} />}
        {tabIndex == 1 && (
          <table
            style={{ overflowX: "scroll", maxWidth: "100%" }}
            className="table table-sm table-striped table-bordered border-primary"
          >
            <thead>
              <tr>
                <th scope="col">Services</th>
                {Object.keys(compareCostData).map((item, index) => (
                  <th key={index} scope="col">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {["Total Cost", ...barChartKey(compareCostData)].map(
                (item, index) => (
                  <tr key={index}>
                    <th scope="row">{item}</th>
                    {Object.values(reorganizeCosts(compareCostData)[item]).map(
                      (value, index) => (
                        <td key={index}>{value}</td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
        <div className="d-grid"></div>
      </div>
    </div>
  );
}

export default CostTrendComponent;
