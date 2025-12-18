import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFoundpage";
import HomeDesign from "./components/pages/homeDesign";
import Jobs from "./components/pages/jobs";
import JobDetail from "./components/pages/jobDetails";
import Job_seeker_profile from "./components/account/job_seeker/profile";
import AppliedJobs from "./components/account/job_seeker/appliedJobs";
import SavedJobs from "./components/account/job_seeker/savedJobs";
import Employer_profile from "./components/account/employer/profile";
import PostedJobs from "./components/account/employer/postedjobs";
import Applications from "./components/account/employer/applications";
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
        path: "/account/job_seeker/profile",
        element: <Job_seeker_profile />,
      },
      {
        path: "/account/job_seeker/appliedJobs",
        element: <AppliedJobs />,
      },
      {
        path: "/account/job_seeker/savedJobs",
        element: <SavedJobs />,
      },
      {
        path: "/account/employer/profile",
        element: <Employer_profile />,
      },
      {
        path: "/account/employer/posted-Jobs",
        element: <PostedJobs />,
      },
      {
        path: "/account/employer/applications",
        element: <Applications />,
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
