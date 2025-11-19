import { useEffect, useReducer, createContext } from "react";
import axios from "axios";

export const jobContext = createContext({
  jobList: [],
  isLoggedin: undefined,
  setIsloggedin: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "activeUser":
      return {
        ...state,
        isLoggedin: action.payload.status,
      };

    case "getJobList":
      return {
        ...state,
        jobList: action.payload.jobList,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    jobList: [],
    isLoggedin: undefined,
  });
  console.log("jobList Array \n", state.jobList);
  console.log("isLoggedin ? ", state.isLoggedin);

  // to set the isLoggedin state
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/auth/status",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: "activeUser",
          payload: { status: res.data.isLoggedin },
        });
      })
      .catch(() => {
        dispatch({ type: "activeUser", payload: { status: false } });
      });
  }, []);

  const setIsloggedin = (status) => {
    dispatch({
      type: "activeUser",
      payload: {
        status,
      },
    });
  };

  return (
    <jobContext.Provider
      value={{
        jobList: state.jobList,
        isLoggedin: state.isLoggedin,
        setIsloggedin,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};
