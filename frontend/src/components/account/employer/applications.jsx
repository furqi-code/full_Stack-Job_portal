import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import CandidateTable from "../../shared/applicationCandidateTable";
import Sidebar from "../sidebar";
import axios from "axios";

const Applications = () => {
  const queryClient = useQueryClient();
  // used in sidebar
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");

  const yourCandidates = async () => {
    try{
      const res = await axios('http://localhost:1111/account/employer/applications', {withCredentials: true})
      return res.data.data
    }catch(err){
      console.log(err)
      throw err
    }
  }

  const {data: applications = [], isLoading, isError} = useQuery({
    queryKey: ['applications'],
    queryFn: yourCandidates,
    staleTime: 10000
  })

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
              <div className="space-y-6 min-h-[60vh]">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Applications
                    </h3>
                  </div>
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
                      <p className="text-gray-600 text-lg">
                        Loading list of your Applications...
                      </p>
                    </div>
                  )}
                  {isError && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load your Applications</h3>
                        <p className="text-gray-500 mb-6">Please check your connection and try again.</p>
                        <button 
                          onClick={() => window.location.reload()} 
                          className="px-6 py-2 text-red-600 font-medium rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!isLoading && !isError && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {applications.length > 0 ? (
                        applications.map((candidate) => (
                          <CandidateTable
                            key={candidate.candidate_id}
                            candidate={candidate}
                            queryClient={queryClient}
                          />
                        ))
                      ) : (
                        <p className="col-span-full text-center text-gray-500 py-12">
                          Zero applications / Done with the applications
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right"/>
    </>
  );
};

export default Applications;
