import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AppliedJobTable from "../../shared/appliedJobTable";
import Sidebar from "../sidebar";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  const handleDeleteApplication = async (job_id) => {
    try {
      await axios.delete(
        `http://localhost:1111/account/job_seeker/removeAppliedJob?job_id=${job_id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Application withdrawn successfully!!");
      setAppliedJobs((prev) => prev.filter((job) => job.id !== job_id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete application"
      );
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/job_seeker/appliedJobs",
      withCredentials: true,
    })
      .then((res) => {
        setAppliedJobs(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching your jobs:", error);
      });
  }, []);

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
                      Applied Job list
                    </h3>
                    <Link
                      to="/Jobs"
                      className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 border border-transparent"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {appliedJobs.length > 0 ? (
                      appliedJobs.map((job) => (
                        <Link to={`/jobs/${job.id}`} key={job.id}>
                          <AppliedJobTable
                            key={job.job_id}
                            job={job}
                            appliedJobs={appliedJobs}
                            setAppliedJobs={setAppliedJobs}
                            onDelete={handleDeleteApplication}
                          />
                        </Link>
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
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default AppliedJobs;
