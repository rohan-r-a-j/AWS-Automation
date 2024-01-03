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
    default:
      return state;
      break;
  }
}
let initialState = {
  currentAccount: localStorage.getItem("accountId") || "051650638025",
  token: null,
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
