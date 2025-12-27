import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; 
import JobForm from "./jobform";
import JobCard from "../../shared/jobCard";
import Sidebar from "../sidebar";
import axios from "axios";

const PostedJobs = () => {
  const [showForm, setshowForm] = useState(false);
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  const yourJobs = async () => {
    try{
      const res = await axios.get("http://localhost:1111/account/employer/myJobs", {
        withCredentials: true,
      })
      return res.data.data
    }catch(err){
      console.error("Error fetching your posted Jobs:", err);
      throw err;
    }
  }

  const { data: postedJobs = [], isLoading, isError } = useQuery({
    queryKey: ["postedJobs", showForm],
    queryFn: yourJobs,
    staleTime: 10000
  });

  return (
    <>
      <div className="py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
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
                      {!showForm ? "Posted Jobs" : "Fill up the required fields"}
                    </h3>
                    {!showForm && (
                      <button
                        onClick={() => setshowForm(true)}
                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 border border-transparent"
                      >
                        Post more
                      </button>
                    )}
                  </div>
                  <div className="min-h-[400px]">
                    {isLoading && !showForm ? (
                      <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                          <p className="text-gray-600 text-lg">
                            Loading list of your posted jobs...
                          </p>
                        </div>
                      </div>
                    ) : isError ? (
                      <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load your posted jobs</h3>
                          <p className="text-gray-500 mb-6">Please check your connection and try again.</p>
                          <button 
                            onClick={() => window.location.reload()} 
                            className="px-6 py-2 text-red-600 font-medium rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    ) : showForm ? (
                      <JobForm setshowForm={setshowForm} />
                    ) : postedJobs.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {postedJobs.map((job) => (
                          <Link to={`/jobs/${job.id}`} key={job.id}>
                            <JobCard job={job} />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                        <div className="text-center">
                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
                          <p className="text-gray-500 mb-6">Zero Job posts</p>
                        </div>
                      </div>
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

export default PostedJobs;
