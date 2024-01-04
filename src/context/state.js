import { createContext, useReducer } from "react";

export let StateContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "changeAccount":
      return { ...state, currentAccount: action.payload.currentAccount };
      break;

    case "updateToken":
      return { ...state, token: action.payload.token };
      break;
    case "loggedInUser":
      return { ...state, user: action.payload.user };
      break;
    case "users":
      console.log("called usrs dispatch")
      return { ...state, users: action.payload.users };
      break;
    default:
      return state;
      break;
  }
}
let initialState = {
  currentAccount: localStorage.getItem("accountId") || "051650638025",
  token: null,
  user: null,
  users: [],
};
export default function StateProvider({ children }) {
  let [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}
