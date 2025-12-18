import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { jobContext } from "../../../store/jobContext";
import { ToastContainer, toast } from "react-toastify";
import CandidateTable from "../../shared/applicationCandidateTable";
import Sidebar from "../sidebar";
import axios from "axios";

const Applications = () => {
  const { isLoggedin } = useContext(jobContext);
  const [applications, setApplications] = useState([]);
  console.log('applications\n', applications);
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  // manually reload pe this component renders before isloggedin state changes thats why if() not working
  // so we had to use dependancy to re-run the useEffect
  useEffect(() => {
    if (isLoggedin) {
      axios({
        method: "GET",
        url: "http://localhost:1111/account/employer/applications",
        withCredentials: true,
      })
        .then((res) => {
          setApplications(res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching your Applications:", error);
        });
    }
  }, [isLoggedin]);

  return (
    <>
      <div className="py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
                      Applications
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {applications.length > 0 ? (
                      applications.map((job) => (
                        <CandidateTable
                          key={job.job_id}
                          job={job}
                          applications={applications}
                          setApplications={setApplications}
                        />
                      ))
                    ) : (
                      <p>
                        Zero applications / Nobody applied for your job posts
                      </p>
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

export default Applications;
