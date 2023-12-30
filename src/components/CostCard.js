import { useState } from "react"

function CostCardComponent({handleCardApiCall,costDetails}){


let [loading,setLoading]=useState(false)
    return  <div
    className="card"
    style={{ width: "100%", height: "100%", aspectRatio: 4 / 3 }}
  >
    {/* <img src="..." class="card-img-top" alt="..." /> */}

    <div className="card" style={{ height: "100%" }}>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between">
          <div
            style={{
              fontWeight: 100,
              fontSize: "2rem",
              backgroundColor: "#eee",
              display: "inline",
              padding: "0rem 0.4rem",
              borderRadius: 5,
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "solid 2px #444",
            }}
          >
            Total cost Till Date
          </div>
          <button
            onClick={() => handleCardApiCall("top_7_service_data",setLoading)}
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

        <hr />

        <div
          className="card-text text-center"
          style={{
            fontSize: "4rem",
            fontFamily: "sans-serif",
            fontWeight: "bolder",
            textDecoration: "underline",
            color: "#d70",
          }}
        >
          $
          {Number(costDetails["Current Month-to-Date Cost"]).toFixed(
            2
          )}
        </div>
      </div>

      <div className="card-body">
        <div
          style={{
            fontWeight: 100,
            fontSize: "2rem",
            backgroundColor: "#eee",
            display: "inline",
            padding: "0rem 0.4rem",
            borderRadius: 5,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "solid 2px #444",
          }}
        >
          Estimated Cost for the Month
        </div>
        <hr />

        <div
          className="card-text text-center"
          style={{
            fontSize: "4rem",
            fontFamily: "monospace",
            fontWeight: "bolder",
            textDecoration: "underline",
            color: "#727",
          }}
        >
          $
          {Number(
            costDetails["Forecasted Total Cost for the Month"]
          ).toFixed(2)}
        </div>
      </div>

      <div className="d-grid"></div>
    </div>
  </div>
}


export default CostCardComponent