import { useEffect, useReducer, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const jobContext = createContext({
  saveJobList: [],
  isLoggedin: undefined,
  setIsloggedin: () => {},
  setUser_type: () => {},
  getSavedJobList: () => {},
  handleSaveJobs: () => {},
  deleteSavedJob: () => {},
  setSaveJobList: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "activeUser":
      return {
        ...state,
        isLoggedin: action.payload.status,
        user_type: action.payload.type,
      };

    case "userType":
      return {
        ...state,
        user_type: action.payload.type,
      };

    case "getSaveJobs":
      return {
        ...state,
        saveJobList: action.payload.saveJobs,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    saveJobList: [],
    isLoggedin: undefined,
    user_type: "",
  });
  console.log("saveJobList Array \n", state.saveJobList);
  console.log("isLoggedin ? ", state.isLoggedin);
  console.log("user type ? ", state.user_type);

  // to set the isLoggedin state mainly
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/auth/status",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: "activeUser",
          payload: { status: res.data.isLoggedin, type: res.data.user_type },
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

  // when a user login
  const setUser_type = (type) => {
    dispatch({
      type: "userType",
      payload: { type },
    });
  };

  // when clicked on logout
  const setSaveJobList = (emptyArr) => {
    dispatch({
      type: "getSaveJobs",
      payload: {
        saveJobList: [...emptyArr],
      },
    });
  };

  const getSavedJobList = () => {
    axios({
      method: "GET",
      url: "http://localhost:1111/job-seeker/savedJob",
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: "getSaveJobs",
          payload: {
            saveJobs: res.data.data,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching saved jobs", error);
      });
  };

  const handleSaveJobs = async (job_id) => {
    if (state.isLoggedin) {
      if (state.user_type !== "job_seeker") {
        return toast.warning("Sorry, you aren't a valid user");
      }
      try {
        const res = await axios({
          method: "POST",
          url: `http://localhost:1111/job-seeker/saveJob?job_id=${job_id}`,
          withCredentials: true,
        });
        toast.success(res.data.message);
        getSavedJobList();
      } catch (err) {
        toast.error("Sorry, couldn't save this particular job");
      }
    } else {
      toast.error("Kindly login to save this job post");
    }
  };

  const deleteSavedJob = async (job_id) => {
    if (state.isLoggedin) {
      if (state.user_type !== "job_seeker") {
        return toast.warning("Sorry, you aren't a valid user");
      }
      try {
        const res = await axios({
          method: "DELETE",
          url: `http://localhost:1111/job-seeker/eliminateJob?job_id=${job_id}`,
          withCredentials: true,
        });
        toast.success(res.data.message);
        getSavedJobList();
      } catch (err) {
        toast.error("Sorry, couldn't delete this particular job");
      }
    } else {
      toast.error("Kindly login to delete this job post");
    }
  };

  return (
    <jobContext.Provider
      value={{
        saveJobList: state.saveJobList,
        isLoggedin: state.isLoggedin,
        setIsloggedin,
        setUser_type,
        getSavedJobList,
        handleSaveJobs,
        deleteSavedJob,
        setSaveJobList,
      }}
    >
      {children}
    </jobContext.Provider>
  );
};
