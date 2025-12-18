import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { jobContext } from "../../../store/jobContext";
import { ToastContainer, toast } from "react-toastify";
import JobCard from "../../shared/jobCard";
import Sidebar from "../sidebar";

const SavedJobs = () => {
  const { isLoggedin, saveJobList, getSavedJobList } = useContext(jobContext);
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  // manually reload pe this component renders before isloggedin state changes thats why if() not working
  // so we had to use dependancy to re-run the useEffect
  useEffect(() => {
    if (isLoggedin) getSavedJobList();
  }, [isLoggedin]);

  return (
    <>
      <div className="py-10 bg-gray-50 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <Sidebar
              name={name}
              profilePic={profilePic}
              setName={setName}
              setProfilePic={setProfilePic}
            />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center  min-h-[60vh]">
              <div className="space-y-8">
                <section className="bg-white shadow-md rounded-lg p-8">
                  {saveJobList.length > 0 ? (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                        Saved Jobs
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {saveJobList.map((job) => (
                          <Link to={`/jobs/${job.id}`} key={job.id}>
                            <JobCard job={job} />
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[400px] py-14 px-8">
                      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-12 max-w-lg w-full">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8 border border-gray-200">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div className="text-center space-y-2 mb-8">
                          <h3 className="text-3xl font-bold text-gray-900">
                            No Saved Jobs
                          </h3>
                        </div>

                        <p className="text-gray-500 text-base leading-relaxed mb-10 text-center max-w-md mx-auto">
                          Save jobs you like from the job listings to keep track
                          of opportunities that interest you. They'll appear
                          here for quick access anytime.
                        </p>
                        <Link
                          to="/jobs"
                          className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white font-semibold text-base rounded-xl shadow-lg shadow-gray-900/40 hover:shadow-black/60 hover:scale-[1.02] hover:from-black hover:via-gray-900 hover:to-black border border-transparent focus:outline-none focus:ring-4 focus:ring-gray-400/40 transition-all duration-300"
                        >
                          <span>Browse All Jobs</span>
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                        <p className="text-xs text-gray-400 mt-6 text-center">
                          Tip: Use the bookmark icon on job cards to save
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default SavedJobs;
