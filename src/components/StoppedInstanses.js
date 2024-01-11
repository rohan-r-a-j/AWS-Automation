import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import{ StateContext } from "../context/state";

const StoppedInstances = () => {
  let [stoppedInstances, setStopInstances] = useState(null);
  let [state, dispatch] = useContext(StateContext);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/aws/lambda/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: "fetch_stopped_instances",
        account: state.currentAccount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStopInstances(data.stopped_instances);
      })
      .catch((err) => {
        console.error(err);
        // toast(err.message, {
        //   theme: "colored",
        //   position: "bottom-right",
        //   draggable: false,
        // });
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-end mb-2">
        {stoppedInstances && (
          <a
            href={`mailto:aws-admins@hcl.com?subject=Reminder%3A%20Action%20Required%20for%20Instances%20in%20Stopped%20State&body=Dear%20User%2C%0A%0AI%20am%20reaching%20out%20to%20you%20because%20it%20has%20been%20observed%20that%20your%20AWS%20instances%20have%20been%20in%20a%20stopped%20state%20for%20over%2010%20days.%20It%20is%20important%20to%20note%20that%20our%20policy%20stipulates%20that%20instances%20in%20a%20stopped%20state%20for%20more%20than%2015%20days%20will%20be%20subject%20to%20termination.%0A%0AWe%20understand%20that%20you%20may%20have%20intentionally%20stopped%20these%20instances%20for%20future%20use.%20If%20this%20is%20the%20case%20and%20you%20still%20require%20these%20instances%2C%20we%20request%20you%20to%20promptly%20provide%20the%20relevant%20details%20to%20our%20administrative%20team%20at%20aws-admins%40hcl.com.%20This%20will%20help%20us%20to%20ensure%20that%20your%20instances%20are%20preserved%20according%20to%20your%20needs.%0A%0APlease%20consider%20this%20as%20a%20friendly%20reminder%20to%20take%20the%20necessary%20action%20to%20avoid%20any%20inconvenience.%20If%20you%20have%20any%20questions%20or%20need%20further%20assistance%2C%20feel%20free%20to%20write%20to%20us%20at%20aws-admins%40hcl.com%0A%0AThank%20You%20For%20Your%20Cooperation%0AHCLTech%20ERS%20AWS%20Administration%20Team&cc=aws-admins@hcl.com&bcc=${stoppedInstances
              .filter((item) => item.CreatedBy !== "N/A")
              .map((item) => item.CreatedBy)
              .join(";")}`}
          >
            <button type="button" className="btn btn-outline-primary btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bell-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
              &nbsp; Send Reminder Email
            </button>
          </a>
        )}
      </div>
      <table className="table table-striped cost-table">
        <thead>
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">InstanceId</th>
            <th scope="col">InstanceName</th>
            <th scope="col">InstanceType</th>
            <th scope="col">CreatedBy</th>
            <th scope="col">Region</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
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
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {stoppedInstances &&
              stoppedInstances.map((item, i) => (
                <tr>
                  <th>{i + 1}</th>
                  {Object.values(item).map((value) => (
                    <td>{value}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default StoppedInstances;
