import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:1111/account/appliedJobs",
  //     headers: {
  //       Authorization: localStorage.getItem("userDetail"),
  //     },
  //   })
  //     .then((res) => {
  //       setAppliedJobs(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching your jobs:", error);
  //     });
  // }, []);

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <Sidebar
              name={name}
              profilePic={profilePic}
              setName={setName}
              setProfilePic={setProfilePic}
            />

            {/* Main Content */}
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Applied Job list
                    </h3>
                    <Link
                      to='/Jobs'
                      className="inline-flex items-center px-5 py-2 border-2 border-green-600 bg-green-600 text-white rounded-lg hover:border-transparent hover:bg-blue-400 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Apply more
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {appliedJobs.length > 0 ? (
                      appliedJobs.map((job) => (
                        <appliedjobCard
                          key={job.job_id}
                          job={job}
                          setAppliedJobs={setAppliedJobs}
                        />
                      ))
                    ) : (
                      <p>Zero jobs applied</p>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
