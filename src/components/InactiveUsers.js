import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import { StateContext } from "../context/state";
import moment from "moment";

const InactiveUsers = () => {
  let [inactiveUsers, setInactiveUsers] = useState(null);
  let [state, dispatch] = useContext(StateContext);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let fetch_inactive_users = JSON.parse(
      sessionStorage.getItem("fetch_inactive_users")
    );
    if (fetch_inactive_users) setInactiveUsers(fetch_inactive_users);
    else {
      setLoading(true);
      fetch(`${baseUrl}/aws/lambda/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: "fetch_inactive_users",
          account: state.currentAccount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setInactiveUsers(data);
          sessionStorage.setItem("fetch_inactive_users", JSON.stringify(data));
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
    }
  }, []);
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-end mb-2">
        {inactiveUsers && (
          <a
            href={`mailto:aws-admins@hcl.com?subject=Reminder%3A%20Inactivity%20on%20Your%20AWS%20Account&body=Dear%20User%2C%0A%0AWe%20are%20reaching%20out%20to%20inform%20you%20that%20we%20have%20not%20detected%20any%20activity%20on%20your%20AWS%20account%20for%20the%20past%2030%20days.%20As%20per%20our%20policy%2C%20accounts%20exhibiting%20prolonged%20inactivity%20are%20classified%20as%20inactive.%20Consequently%2C%20we%20are%20under%20the%20impression%20that%20you%20may%20no%20longer%20require%20access%20to%20the%20AWS%20console.%0A%0AIn%20line%20with%20this%2C%20we%20are%20planning%20to%20disable%20your%20user%20account.%20We%20understand%20that%20there%20might%20be%20various%20reasons%20for%20inactivity%2C%20and%20we%20are%20open%20to%20understanding%20your%20specific%20circumstances.%20If%20your%20account%20is%20still%20needed%2C%20or%20if%20there%20are%20any%20reasons%20for%20the%20inactivity%20that%20we%20should%20be%20aware%20of%2C%20please%20do%20not%20hesitate%20to%20inform%20us.%0A%0AYou%20can%20reach%20out%20with%20your%20concerns%20at%20aws-admins%40hcl.com.%20Your%20prompt%20response%20will%20assist%20us%20to%20prevent%20any%20unnecessary%20disruption%20to%20your%20access.%0A%0AThank%20You%20For%20Your%20Cooperation%0AHCLTech%20ERS%20AWS%20Administration%20Team&cc=aws-admins@hcl.com&bcc=${inactiveUsers
              .map((item) => item.Username)
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
            <th scope="col">Username</th>
            <th scope="col">Last Login</th>
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
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {inactiveUsers &&
              inactiveUsers.map((item, i) => (
                <tr>
                  <th>{i + 1}</th>

                  <td>{item.Username}</td>
                  <td>
                    {item["Last Login"]
                      ? item["Last Login"]
                      : moment(new Date(item["Last Login"])).format(
                          "HH:mm a dd/MM/yy"
                        )}
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default InactiveUsers;
