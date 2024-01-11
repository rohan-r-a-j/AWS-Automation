import React from "react";
import { useNavigate } from "react-router-dom";

let cardConfigs = [
  {
    title: "Stopped Instances",
    descriptions:
      "Access a detailed list of EC2 instances that have been in a stopped state for more than 10 days.",
    redirectTo: "stopped-instances",
  },
  {
    title: "Inactive Users",
    descriptions:
      "Access a detailed list of EC2 instances that have been in a stopped state for more than 10 days.",
    redirectTo: "inactive-users",
  },
];

const Actions = () => {
  let navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div style={{ maxHeight: "auto" }} className="row gap-3">
        {cardConfigs.map((item) => (
          <div className="col-3 card p-2 action-card">
            <h5 className="card-title">{item.title}</h5>
            <hr />
            <div className="card-body">
              <p style={{ textOverflow: "ellipsis" }}>
                {item.descriptions.length > 100
                  ? item.descriptions.slice(0, 100) + "... "
                  : item.descriptions.slice(0, 100)}
                {item.descriptions.length > 100 && (
                  <span className="text-primary">view more</span>
                )}
              </p>
            </div>
            <div className="d-grid">
              <button
                onClick={() => navigate(item.redirectTo)}
                className="btn btn-primary"
              >
                Go to
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actions;
