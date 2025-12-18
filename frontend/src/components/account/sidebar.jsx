import {
  UserCircleIcon,
  DocumentTextIcon,
  HeartIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { jobContext } from "../../store/jobContext";
import axios from "axios";

const Sidebar = ({ name, profilePic, setName, setProfilePic }) => {
  const { setIsloggedin, setSaveJobList, user_type } = useContext(jobContext);
  const navigate = useNavigate();

  let tabs = [];
  if (user_type === "job_seeker") {
    tabs = [
      {
        id: "profile",
        url: "/account/job_seeker/profile",
        name: "My Profile",
        icon: UserCircleIcon,
      },
      {
        id: "applied",
        url: "/account/job_seeker/appliedJobs",
        name: "Applied Jobs",
        icon: DocumentTextIcon,
      },
      {
        id: "saved",
        url: "/account/job_seeker/savedJobs",
        name: "Saved Jobs",
        icon: HeartIcon,
      },
      {
        id: "password",
        url: "/account/change-password",
        name: "Change Password",
        icon: KeyIcon,
      },
    ];
  }

  if (user_type === "employer") {
    tabs = [
      {
        id: "profile",
        url: "/account/employer/profile",
        name: "My Profile",
        icon: UserCircleIcon,
      },
      {
        id: "Posts",
        url: "/account/employer/Posted-Jobs",
        name: "Posted Jobs",
        icon: DocumentTextIcon,
      },
      {
        id: "applications",
        url: "/account/employer/Applications",
        name: "Applications",
        icon: HeartIcon,
      },
      {
        id: "password",
        url: "/account/change-password",
        name: "Change Password",
        icon: KeyIcon,
      },
    ];
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/job_seeker/profile",
      withCredentials: true,
    })
      .then((res) => {
        const { name, profile_pic } = res.data.info;
        setName(name);
        setProfilePic(profile_pic);
      })
      .catch((err) => {
        console.log("Couldn't fetch user profile", err);
      });
  }, []);

  const logout = () => {
    axios({
      method: "POST",
      url: "http://localhost:1111/logout",
      withCredentials: true,
    }).then(() => {
      setIsloggedin(false);
      setSaveJobList([]);
      navigate("/");
    });
  };

  return (
    <aside className="md:w-64 flex-shrink-0">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profilePic}
            alt="profile pic"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-medium text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">View Profile</p>
          </div>
        </div>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.url}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </Link>
          ))}
        </nav>
        <div className="pt-4 mt-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
