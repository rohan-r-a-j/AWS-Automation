import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/state";
import { navigate } from "../..";
import { Link } from "react-router-dom";
import "../styles/Nav.css";
import { baseUrl } from "../../utils/utils";
import { toast } from "react-toastify";
export default function NavComponents(props) {
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);

  let [state, dispatch] = useContext(StateContext);
  let { token, user } = state;
  console.log(window.location.pathname)

  useEffect(() => {
    if (!token) {
      dispatch({
        type: "updateToken",
        payload: { token: sessionStorage.getItem("token") },
      });
    }
    fetch(`${baseUrl}/auth`, {
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
        // Add any additional headers if needed,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "loggedInUser",
          payload: { user: data },
        });
        sessionStorage.setItem("user", JSON.stringify(data));
        //console.log("user", data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  function handleClick(currentAccount) {
     // eslint-disable-next-line no-restricted-globals
     let isConfirmed = confirm(
      "Switching accounts will take some time to refresh. Are you sure? "
    );
    if (!isConfirmed) {
      toast("Can't switch to account", {
        draggable: false,
        position: "bottom-right",
        type: "error",
        theme: "colored",
      });
      return;
    }
    toast(`Successfully switched to account ${currentAccount}`, {
      draggable: false,
      position: "top-right",
      type: "success",
      theme: "colored",
    });
    localStorage.clear();
    localStorage.setItem("accountId", currentAccount.toString());
    dispatch({
      type: "changeAccount",
      payload: { currentAccount: currentAccount.toString() },
    });
    // localStorage.setItem("accountId", currentAccount.toString());
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid ">
        <div
          style={{ width: "100%" }}
          className="d-flex flex-row justify-content-between"
        >
          <a
            className="navbar-brand text-light"
            style={{ width: "4rem", fontWeight: "bold" }}
            href="#"
          >
            HCLTech |{"  "}
            <svg width={60} viewBox="0 40 128 60">
              <path
                fill="#fff"
                d="M44.634 57.361c-2.599 0-5.499 1.001-6.107 4.296-.064.351.167.517.391.567l2.663.32c.246-.014.414-.28.461-.533.228-1.134 1.16-1.669 2.201-1.669.563 0 1.193.193 1.527.71.381.576.354 1.359.354 2.024v.391c-1.582.182-3.666.292-5.147.958-1.709.76-2.912 2.307-2.912 4.58 0 2.913 1.785 4.366 4.083 4.366 1.94 0 3.013-.456 4.509-2.022.497.738.656 1.073 1.562 1.846a.55.55 0 00.64-.071v.035c.545-.497 1.535-1.401 2.094-1.881.222-.187.174-.493 0-.746-.5-.707-1.029-1.276-1.029-2.592v-4.366c0-1.85.156-3.556-1.172-4.828-1.046-1.031-2.791-1.385-4.118-1.385zm35.786 0c-2.6 0-5.498 1.001-6.106 4.296-.064.351.166.517.39.567l2.664.32c.246-.014.415-.28.461-.533.229-1.134 1.161-1.669 2.201-1.669.564 0 1.193.193 1.526.71.381.576.319 1.359.319 2.024v.391c-1.582.182-3.63.292-5.112.958-1.711.76-2.91 2.307-2.91 4.58 0 2.913 1.785 4.366 4.082 4.366 1.938 0 3.011-.456 4.509-2.022.495.738.656 1.073 1.563 1.846a.548.548 0 00.639-.071v.035c.546-.497 1.537-1.401 2.095-1.881.222-.187.171-.493 0-.746-.5-.707-1.03-1.276-1.03-2.592v-4.366c0-1.85.12-3.556-1.206-4.828-1.05-1.031-2.759-1.385-4.085-1.385zm-20.13.142c-1.68 0-2.924.848-3.585 2.663h-.036v-1.882a.534.534 0 00-.496-.497h-2.557a.54.54 0 00-.533.533v14.378a.554.554 0 00.498.497h2.733a.537.537 0 00.532-.533v-7.633c0-1.664-.08-3.94 1.882-3.94 1.937 0 1.668 2.339 1.668 3.94v7.633c0 .271.222.515.498.533h2.733c.29 0 .532-.243.532-.533v-7.633c0-.816-.033-2.006.248-2.733s.971-1.207 1.634-1.207c.789 0 1.394.275 1.598 1.242.126.575.071 2.094.071 2.698v7.633c0 .271.222.515.496.533h2.734c.29 0 .532-.243.532-.533v-9.088c0-1.545.154-3.298-.71-4.509-.765-1.088-2.015-1.563-3.16-1.563-1.605 0-3.101.848-3.763 2.663-.764-1.814-1.842-2.662-3.549-2.662zm46.472 0c-3.949 0-6.142 3.473-6.142 7.953 0 4.448 2.167 8.022 6.142 8.022 3.823 0 6.249-3.492 6.249-7.881 0-4.537-2.198-8.094-6.249-8.094zm15.585 0c-1.887 0-2.966.943-3.728 2.911h-.035v-2.201c-.049-.222-.258-.377-.497-.39h-2.521a.525.525 0 00-.533.461v14.378c0 .271.225.515.497.533h2.699a.54.54 0 00.531-.533v-7.739c0-.97.083-1.855.463-2.733.306-.697.899-1.137 1.562-1.137 1.883 0 1.703 2.295 1.703 3.87v7.811a.545.545 0 00.498.462h2.733a.537.537 0 00.532-.462v-9.053c0-1.392.003-3.324-.71-4.474-.764-1.241-1.975-1.704-3.194-1.704zm-32.803.249c-.278 0-.497.22-.498.532v2.059c.001.31.213.531.498.533h4.686l-5.361 7.916c-.326.511-.354 1.089-.354 1.421v2.095c0 .302.328.63.639.461 3.056-1.668 6.717-1.52 9.479-.035.336.183.675-.16.675-.462V70.07a.934.934 0 00-.497-.781c-1.568-.901-3.388-1.178-5.111-1.136l4.65-6.815c.43-.613.67-.981.674-1.279v-1.774c0-.306-.209-.532-.496-.532h-8.984zm17.218 2.698c.865 0 1.504.386 1.811 1.384.354 1.152.391 2.588.391 3.799 0 1.846-.086 4.899-2.201 4.899-2.139 0-2.13-3.78-2.13-5.538-.001-1.753.117-4.544 2.129-4.544zm-60.673 5.254v.604c0 1.092.04 2.01-.497 2.981-.434.79-1.116 1.279-1.881 1.279-1.045 0-1.668-.849-1.668-2.06-.001-2.387 2.074-2.804 4.046-2.804zm35.786 0v.604c0 1.092.04 2.01-.496 2.981-.435.79-1.112 1.279-1.882 1.279-1.047 0-1.669-.849-1.669-2.06 0-2.387 2.073-2.804 4.047-2.804z"
              ></path>
              <path
                fill="#fff"
                d="M99.59 73.656v2.06h1.386v-2.06H99.59zm-40.152.356v14.662h1.278V87.36c.272.521.582.91.958 1.171.376.262.806.391 1.277.391.939 0 1.75-.479 2.45-1.455.701-.977 1.065-2.392 1.065-4.189 0-1.178-.151-2.154-.462-2.981-.311-.826-.725-1.441-1.242-1.847-.519-.406-1.107-.639-1.739-.639-.452 0-.874.118-1.244.354-.368.236-.666.622-.958 1.101v-5.254h-1.383zm13.135 3.443c-.962 0-1.728.285-2.271.852s-.815 1.296-.815 2.202c0 .525.115.972.318 1.384.202.413.49.748.852.994.364.246 1.09.57 2.166.923.745.24 1.19.444 1.385.604.281.233.427.538.427.959 0 .486-.17.892-.498 1.207-.328.317-.786.461-1.385.461-.6 0-1.094-.168-1.455-.532-.362-.364-.557-.918-.64-1.668l-1.384.283c.313 2.278 1.449 3.41 3.408 3.408 1.045 0 1.844-.295 2.449-.923.604-.628.924-1.471.924-2.485 0-.548-.098-1.022-.284-1.419a2.251 2.251 0 00-.782-.924c-.336-.229-1.089-.536-2.236-.923-.834-.292-1.321-.506-1.49-.64-.284-.224-.427-.53-.427-.922 0-.4.133-.739.427-.995.294-.255.747-.39 1.349-.39 1.058 0 1.65.581 1.774 1.739l1.35-.213c-.094-.732-.253-1.312-.496-1.705a2.665 2.665 0 00-1.065-.958c-.465-.232-.992-.319-1.601-.319zm8.486 0c-1.109 0-2.046.457-2.77 1.42-.723.963-1.063 2.358-1.063 4.189 0 1.764.348 3.146 1.063 4.083.718.934 1.646 1.384 2.806 1.384.921 0 1.685-.276 2.307-.852.624-.575 1.077-1.423 1.313-2.557l-1.42-.248c-.407 1.451-1.16 2.163-2.2 2.165-.664 0-1.206-.281-1.669-.887-.464-.607-.726-1.507-.78-2.698h6.105v-.497c0-1.792-.357-3.137-1.065-4.083-.709-.945-1.569-1.419-2.627-1.419zm8.414 0c-.331 0-.621.112-.888.355-.267.242-.567.744-.888 1.49v-1.633h-1.243v10.615h1.385v-5.538c0-.772.074-1.516.249-2.201.1-.394.289-.703.532-.923.244-.221.523-.32.816-.32.326 0 .65.131.994.391l.462-1.668c-.482-.386-.955-.568-1.419-.568zm16.969 0c-1.096 0-1.999.462-2.699 1.385-.696.923-1.063 2.309-1.063 4.153 0 1.831.372 3.218 1.063 4.154.693.934 1.559 1.384 2.628 1.384.884 0 1.642-.328 2.272-.994.63-.665 1.014-1.646 1.172-2.911l-1.35-.213c-.101.905-.336 1.557-.71 1.988-.373.43-.823.639-1.349.639-.67 0-1.241-.313-1.67-.958-.427-.646-.638-1.68-.638-3.124 0-1.4.227-2.41.674-3.053.448-.644 1.021-.994 1.704-.994.457 0 .847.177 1.172.531.327.356.543.918.674 1.634l1.351-.283c-.162-1.119-.521-1.962-1.102-2.521-.58-.56-1.284-.817-2.129-.817zm7.917 0c-1.11 0-2.046.457-2.77 1.42-.723.963-1.065 2.358-1.065 4.189 0 1.764.349 3.146 1.065 4.083.719.934 1.646 1.384 2.805 1.384.918 0 1.685-.276 2.308-.852.622-.575 1.075-1.423 1.314-2.557l-1.42-.248c-.41 1.451-1.128 2.163-2.166 2.165-.664 0-1.241-.281-1.704-.887-.463-.607-.725-1.507-.781-2.698h6.106v-.497c0-1.792-.357-3.137-1.065-4.083-.706-.945-1.568-1.419-2.627-1.419zm8.202 0c-.966 0-1.729.285-2.272.852-.545.566-.817 1.296-.817 2.202 0 .525.082.972.284 1.384.2.413.489.748.853.994.361.246 1.09.57 2.166.923.743.24 1.226.444 1.42.604.281.233.426.538.426.959 0 .486-.168.892-.497 1.207-.326.317-.785.461-1.384.461-.602 0-1.094-.168-1.456-.532-.361-.364-.595-.918-.675-1.668l-1.384.283c.313 2.278 1.446 3.41 3.407 3.408 1.047 0 1.881-.295 2.485-.923s.922-1.471.922-2.485c0-.548-.096-1.022-.282-1.419a2.322 2.322 0 00-.817-.924c-.336-.229-1.054-.536-2.2-.923-.835-.292-1.357-.506-1.527-.64-.283-.224-.426-.53-.426-.922 0-.4.167-.739.462-.995.294-.255.75-.39 1.35-.39 1.058 0 1.649.581 1.774 1.739l1.349-.213c-.094-.732-.252-1.312-.497-1.705a2.662 2.662 0 00-1.064-.958c-.463-.232-.994-.319-1.6-.319zm-31.668.213l3.09 10.615h1.313l3.089-10.615h-1.42l-1.811 6.497c-.219.785-.413 1.464-.533 2.023-.15-.705-.296-1.446-.496-2.166l-1.775-6.354h-1.457zm8.697 0v10.615h1.386V77.668H99.59zm-45.513.143c-1.098 0-1.981.492-2.697 1.455-.717.963-1.102 2.358-1.102 4.189 0 1.765.355 3.113 1.065 4.047.709.935 1.657 1.42 2.806 1.42.911 0 1.655-.312 2.271-.888.616-.575 1.042-1.423 1.279-2.556l-1.385-.213c-.404 1.451-1.136 2.163-2.165 2.165-.659 0-1.21-.281-1.669-.888-.46-.606-.727-1.506-.781-2.697h6.035l.036-.497c0-1.792-.364-3.172-1.065-4.119-.701-.945-1.581-1.418-2.628-1.418zm-15.584.248l2.485 10.615h1.455l1.634-8.165.284 1.81 1.313 6.355h1.42l2.521-10.615h-1.313L46.906 84.2l-.462 2.06-.426-2.06-1.207-6.142h-1.42l-1.278 6.213-.426 2.201-.496-2.272-1.279-6.142h-1.419zm42.53.852c.69 0 1.258.333 1.704.994.306.452.506 1.14.567 2.059h-4.58c.044-.932.307-1.65.747-2.201.44-.55.943-.852 1.562-.852zm33.3 0c.688 0 1.258.333 1.704.994.308.452.506 1.14.569 2.059h-4.581c.044-.932.308-1.65.746-2.201.437-.55.943-.852 1.562-.852zm-60.246.39c.682 0 1.23.334 1.67.995.304.452.505 1.14.567 2.059h-4.51c.043-.932.275-1.687.711-2.236.434-.552.948-.818 1.562-.818zm8.805 0c.615 0 1.14.342 1.563.995.423.652.604 1.659.604 3.053 0 1.357-.2 2.37-.64 3.053-.439.684-.96 1.029-1.526 1.029-.416 0-.794-.14-1.136-.426-.344-.286-.595-.696-.782-1.242-.186-.546-.283-1.387-.283-2.485 0-1.294.231-2.263.674-2.947.443-.684.96-1.03 1.526-1.03z"
              ></path>
              <path
                fill="#F7A80D"
                d="M18.594 68.048l-5.29 2.271 4.899 2.095 5.681-2.095-5.29-2.271zm-7.952 2.839l-.178 10.226 7.74 3.408V73.905l-7.562-3.018zm15.904 0l-6.994 2.663v10.012l6.994-2.84v-9.835zm8.343-31.809l-5.326 2.271 4.935 2.095 5.681-2.095-5.29-2.271zm-7.385 3.018V52.32l6.604 1.917.213-9.302-6.817-2.839zm14.769.567l-6.249 2.663v10.047l6.249-2.84v-9.87zM9.877 53.468l-5.29 2.272 4.899 2.095 5.68-2.095-5.289-2.272zm-7.951 2.841l-.178 10.224 7.739 3.408V59.326l-7.561-3.017zm15.904 0l-6.994 2.662v10.012l6.994-2.84v-9.834zm9.088-3.218l-5.29 2.271 4.899 2.094 5.68-2.094-5.289-2.271zm-7.952 2.839l-.177 10.225 7.739 3.408V58.948l-7.562-3.018zm15.905 0l-6.994 2.663v10.012l6.994-2.841V55.93zm16.662-16.852l-5.289 2.271 4.899 2.095 5.681-2.095-5.291-2.271zm-7.952 2.84l-.178 10.225 7.74 3.407V44.936l-7.562-3.018zm15.904 0l-6.994 2.663v10.011l6.994-2.84v-9.834z"
              ></path>
            </svg>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={{ marginLeft: "8rem" }}
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {token && (
                <li className="nav-item">
                  <div
                    className="nav-link text-light"
                    aria-current="page"
                    onClick={() => navigate("/")}
                    role="button"
                  >
                    Dashboard
                  </div>
                </li>
              )}
              {(user?.type === "root" || user?.type === "admin") && token && (
                <>
                <li className="nav-item">
                  <div
                    className="nav-link text-light "
                    aria-current="page"
                    role="button"
                    onClick={() => navigate("/manage/user")}
                  >
                    Users
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link text-light "
                    aria-current="page"
                    role="button"
                    onClick={() => navigate("/manage/task")}
                  >
                    Task
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link text-light "
                    aria-current="page"
                    role="button"
                    onClick={() => navigate("/manage/iam/users")}
                  >
                    IAM
                  </div>
                </li>
                </>
              )}
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form> */}
            <div className="d-flex flex-row align-items-center mx-2">
              {/* <h6 className="text-light" style={{margin:0}}>AWS ID: 051650638025</h6> */}
              {token && (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link text-light dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    AWS ID:{" "}
                    <span
                      style={{ fontWeight: "900", fontFamily: "monospace" }}
                    >
                      {" "}
                      {state.currentAccount}
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li onClick={() => handleClick("051650638025")}>
                      <a className="dropdown-item " href="#">
                        AWS ID: 051650638025
                      </a>
                    </li>
                    <li onClick={() => handleClick("388328004932")}>
                      <a className="dropdown-item " href="#">
                        AWS ID: 388328004932
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {token && (
              <div className="dropdown">
                <button
                  onClick={() => {
                    // dispatch({
                    //   type: "loggedInUser",
                    //   payload: { user: null },
                    // });
                    // dispatch({ type: "updateToken", payload: { token: null } });
                    // sessionStorage.removeItem("token");
                    // sessionStorage.removeItem("user");
                    // toast("Successfully logged out", {
                    //   draggable: false,
                    //   position: "bottom-right",
                    //   type: "info",
                    //   theme: "colored",
                    // });
                    // navigate("/login");
                  }}
                  className="user-icon "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </button>
                <ul className="dropdown-menu">
                  {state.user && (
                    <li draggable={false}>
                      <div
                        className="text-center hover-none"
                        style={{ fontWeight: "bold" }}
                      >
                        {state.user.name}{" "}
                      </div>
                      <div
                        className="text-center hover-none"
                        style={{ fontWeight: "100", fontSize: "0.8rem" }}
                      >
                        {state.user.email}{" "}
                      </div>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/changePassword")}
                      className="dropdown-item"
                      type="button"
                    >
                      Change password
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <div className="d-grid">
                      <button
                        className="btn btn-sm btn-danger mx-2"
                        type="button"
                        onClick={() => {
                          dispatch({
                            type: "loggedInUser",
                            payload: { user: null },
                          });
                          dispatch({
                            type: "updateToken",
                            payload: { token: null },
                          });
                          sessionStorage.removeItem("token");
                          sessionStorage.removeItem("user");
                          toast("Successfully logged out", {
                            draggable: false,
                            position: "bottom-right",
                            type: "info",
                            theme: "colored",
                          });
                          navigate("/login");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-1"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                          />
                        </svg>
                        Log out
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
