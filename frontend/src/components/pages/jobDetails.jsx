import { jobContext } from "../../store/jobContext";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import Example from '../shared/applyModal';
import axios from "axios";

const JobDetail = () => {
  const { handleSaveJobs, deleteSavedJob, saveJobList } = useContext(jobContext);
  const [jobSearch, setJob] = useState(null);
  const [isApplied, setisApplied] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  console.log("job id - ", jobId);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:1111/joblist/oneJob?id=${jobId}`)
      .then((res) => {
        setJob(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Couldn't fetch job details. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (jobSearch) {
      const isSaved = saveJobList.some((saved) => saved.job_id === jobSearch.id);
      setAlreadySaved(isSaved);
    } else {
      setAlreadySaved(false); // reset if jobSearch is not loaded yet
    }
  }, [saveJobList, jobSearch]); 

  const fallBack = {
    title: "ABC",
    company: "XYZ",
    description: "",
    location: "",
    work_mode: "",
    type: "",
    salary_min: 0,
    salary_max: 0,
    experience_min: 0,
    experience_max: 0,
    // applications: [],
    created_at: "",
  };
  const job = jobSearch || fallBack;

  const getModeColor = (mode) => {
    if (mode === "Hybrid") return "bg-yellow-100 text-yellow-700";
    if (mode === "Remote") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };
  const getTypeColor = (type) => {
    const trimmedType = type.trim();
    if (trimmedType === "Full-time") return "bg-green-100 text-green-700";
    if (trimmedType === "Part-time") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const modeColor = getModeColor(job.work_mode);
  const typeColor = getTypeColor(job.type);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-600 text-lg">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center min-h-[300px] text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div>
            {/* Company logo and name */}
            <div className="flex items-center gap-4 mb-4">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {job.company}
              </h1>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              {job.title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-4">
              <span
                className={`inline-block ${typeColor} rounded-full px-3 py-1 text-sm font-semibold`}
              >
                {job.type}
              </span>
              <span
                className={`inline-block ${modeColor} rounded-full px-3 py-1 text-sm font-semibold`}
              >
                {job.work_mode}
              </span>
              <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
                {job.location}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <button
              className={`p-2 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm cursor-grab
                ${
                  alreadySaved
                    ? "bg-gradient-to-r from-emerald-400 to-green-600 border-transparent text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600"
                }`}
              onClick={async () => {
                if (!alreadySaved) await handleSaveJobs(job.id);
                else await deleteSavedJob(job.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                />
              </svg>
            </button>
            <button
            onClick={() => setOpen(true)}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 text-white font-bold transition-colors duration-300 ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors cursor-grab focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        </div>

        {open ? <><Example setOpen={setOpen} open={open} /></> : ""}

        {/* Job Details */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Job Details
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold">Role</h3>
              <p className="pl-4">{job.title}</p>
            </div>
            <div>
              <h3 className="font-bold">Description</h3>
              <p className="pl-4 leading-relaxed">{job.description}</p>
            </div>
            <div>
              <h3 className="font-bold">Work Mode</h3>
              <p className="pl-4">{job.work_mode}</p>
            </div>
            <div>
              <h3 className="font-bold">Experience Required</h3>
              <p className="pl-4">
                {job.experience_min} - {job.experience_max} years
              </p>
            </div>
            <div>
              <h3 className="font-bold">Salary Range</h3>
              <p className="pl-4">
                {job.salary_min} - {job.salary_max} LPA
              </p>
            </div>
            <div>
              <h3 className="font-bold">Posted Date</h3>
              <p className="pl-4">{job.created_at.split("T")[0]}</p>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer position="bottom-right"/>
    </>
  );
};

export default JobDetail;
