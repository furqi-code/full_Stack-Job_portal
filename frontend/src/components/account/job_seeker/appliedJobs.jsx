import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppliedJobTable from "../../shared/appliedJobTable";
import Sidebar from "../sidebar";
import axios from "axios";

const AppliedJobs = () => {
  const queryClient = useQueryClient();
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  const yourAppliedJobs = async () => {
    try{
      const res = await axios.get("http://localhost:1111/account/job_seeker/appliedJobs", {withCredentials: true})
      return res.data.data;
    }catch(err){
      console.error("Error fetching your tryout / applied jobs:", err);
      throw err
    } 
  }

  const {data: appliedJobs = [], isLoading, isError} = useQuery({
    queryKey: ['appliedJobs'],
    queryFn: yourAppliedJobs,
    staleTime: 10000
  })

  const withdrawApplication = async (job_id) => {
    const res = await axios.delete(
      `http://localhost:1111/account/job_seeker/removeAppliedJob?job_id=${job_id}`, { withCredentials: true });
    return res.data.data
  }

  const { mutate } = useMutation({
    mutationFn: withdrawApplication,
    onSuccess: (data, job_id) => {  
      toast.success("Application withdrawn successfully!!");
      queryClient.setQueryData(['appliedJobs'], (prev) => 
        prev.filter((job) => job.id !== job_id)  
      );
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  });

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
                    {isLoading && (
                      <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
                        <p className="text-gray-600 text-lg text-center">Loading list of your Tryouts / Applications...</p>
                      </div>
                    )}
                    {isError && (
                      <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] py-12">
                        <div className="text-center max-w-md">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load your tryouts / applications</h3>
                          <p className="text-gray-500 mb-6">Please check your connection and try again.</p>
                          <button 
                            onClick={() => window.location.reload()} 
                            className="px-6 py-2 text-red-600 font-medium rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    )}
                    {!isLoading && !isError && (
                      appliedJobs.length > 0 ? (
                        appliedJobs.map((job) => (
                          <Link to={`/jobs/${job.id}`} key={job.id} className="block">
                            <AppliedJobTable job={job} onDelete={mutate} />
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] py-12">
                          <p className="text-gray-500 text-lg">You have applied to zero jobs</p>
                        </div>
                      )
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
