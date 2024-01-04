    import { Suspense, useEffect, useRef, useState } from "react";
    import { useSearchParams } from "react-router-dom";

    export default function GetInstaceDetails() {
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [queryParams] = useSearchParams();
    let inputRef = useRef(null);

    useEffect(() => {
        // console.log("route", route.get('inst'))
    }, []);

    function findInstanceDetails() {
        // let instanceId =queryParams.get('instance_id')
        let lambdaFunctionURL = `https://hc2fxfnkrpl7bavtcziq4p27gm0vufck.lambda-url.us-east-2.on.aws/?instance_id=${inputRef.current.value}`;
        setLoading(true);
        fetch(lambdaFunctionURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed,
        },
        // body:JSON.stringify({ instance_id: instanceId })
        })
        .then((response) => {
   
            return response.json();
        })
        .then((res) => {
            setData(res);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <div className="container d-flex flex-column justify-content-center">
        <form
            className="card p-3 "
            style={{ marginInline: "15rem", marginBlock: "1rem" }}
        >
            <h1>Instance Details Lookup</h1>
            <div
            style={{ width: "100%" }}
            className="d-flex flex-column justify-content-center"
            >
            <label htmlFor="instanceId">Instance ID:</label>
            <input
                ref={inputRef}
                type="text"
                id="instanceId"
                name="instanceId"
                placeholder="Please enter instance ID"
            />

            <div className="d-grid my-2">
                <input
                className="btn btn-success"
                type="button"
                value="Search"
                onClick={findInstanceDetails}
                />
                <button
                className="btn btn-outline-success   my-2"
                type="button"
                onClick={() => {
                    inputRef.current.value = "";
                }}
                >
                Reset
                </button>
            </div>
            </div>
        </form>
        {loading && (
            <div className="d-flex flex-row justify-content-center">
            <img style={{width:"10rem",mixBlendMode:'multiply'}} src="https://i.giphy.com/xTk9ZvMnbIiIew7IpW.webp" />
            </div>
        )}

        {(data&& !loading) && (
            <table className="table table-striped">
            <tbody>
                <tr>
                <td>Region</td>
                <td>{data.Region}</td>
                </tr>
                <tr>
                <td>InstanceId</td>
                <td>{data.InstanceId}</td>
                </tr>
                <tr>
                <td>InstanceType</td>
                <td>{data.InstanceType}</td>
                </tr>
                <tr>
                <td>State</td>
                <td
                    className={[
                    data.State == "stopped"
                        ? "badge bg-danger text-light"
                        : "badge bg-success text-light",
                    ]}
                >
                    {data.State}
                </td>
                </tr>
                <tr>
                <td>PrivateIpAddress</td>
                <td>{data.PrivateIpAddress}</td>
                </tr>
                <tr>
                <td>PublicIpAddress</td>
                <td>{data.PublicIpAddress}</td>
                </tr>
                <tr>
                <td>LaunchTime</td>
                <td>{data.LaunchTime}</td>
                </tr>
                <tr>
                <td>CreatedBy</td>
                <td>{data.CreatedBy}</td>
                </tr>
            </tbody>
            </table>
        )}
        </div>
    );
    }
