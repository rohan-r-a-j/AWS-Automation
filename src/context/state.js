import { createContext, useReducer } from "react";

export let StateContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "changeAccount":
      return { ...state, currentAccount: action.payload.currentAccount };
      break;

    default:
      return state;
      break;
  }
}
let initialState = {
  currentAccount: localStorage.getItem("accountId") || "051650638025",
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
