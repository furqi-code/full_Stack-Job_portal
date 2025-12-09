import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFoundpage";
import HomeDesign from "./components/pages/homeDesign";
import Jobs from "./components/pages/jobs";
import JobDetail from "./components/pages/jobDetails";
import Profile from "./components/account/profile";
import AppliedJobs from "./components/account/appliedJobs";
import SavedJobs from "./components/account/savedJobs";
import ChangePassword from "./components/account/changePassword";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeDesign />,
      },
      {
        path: "Jobs",
        element: <Jobs />,
      },
      {
        path: "Jobs/:jobId",
        element: <JobDetail />,
      },
      {
        path: "/account/profile",
        element: <Profile />,
      },
      {
        path: "/account/appliedJobs",
        element: <AppliedJobs />,
      },
      {
        path: "/account/savedJobs",
        element: <SavedJobs />,
      },
      {
        path: "/account/change-password",
        element: <ChangePassword />,
      },  
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};
