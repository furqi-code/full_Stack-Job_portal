import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CandidateTable = ({ candidate, setApplications }) => {
  const getModeColor = (mode) => {
    const modes = {
      Hybrid: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Remote: "bg-green-100 text-green-700 border-green-200",
      "On-site": "bg-red-100 text-red-700 border-red-200",
    };
    return modes[mode] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const candidateSelection = (candidate_status, candidate_id, job_id) => {
    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/employer/selection",
      withCredentials: true,
      params: { candidate_status, candidate_id, job_id },
    })
      .then((res) => {
        toast.info(`this candidate got ${candidate_status}`);
        // could have called an api to get fresh data but better approach i directly change the state after the operation
        // keeping all applications except the one that was just shortlisted / rejected
        setApplications((prevApplications) => {
          return prevApplications.filter((app) => {
            const isSameCandidate = app.candidate_id === candidate_id && app.job_id === job_id;
            return !isSameCandidate;
          });
        });

        // other approach (unnecessary)
        // to see the updated candidates also but then you have to remove a.status=? in WHERE clause in employer.js
        // to get all the application you have/had from candidates
        // setApplications((prevApplications) =>
        //   prevApplications.map((app) =>
        //     app.profile_id === candidate_id && app.job_id === job_id
        //       ? { ...app, status: candidate_status }
        //       : app
        //   )
        // );
      })
      .catch((error) => {
        console.error("Error while candidate selection:", error);
      });
  };

  return (
    <div className="group flex flex-col p-5 gap-4 rounded-xl transition-all duration-200 border border-gray-200/50 hover:border-blue-300 hover:shadow-sm hover:shadow-black/10 bg-gradient-to-r from-amber-900/10 via-white/95 to-blue-50/90">
      {/* Top Section: Logo & Details */}
      <div className="flex items-start space-x-4 w-full">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
          {candidate.companyLogo ? (
            <img
              src={candidate.companyLogo}
              alt={candidate.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-gray-300">
              {candidate.company?.charAt(0)}
            </span>
          )}
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 truncate text-lg">
              {candidate.name}
            </h4>
            <div
              className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border shrink-0 ${getModeColor(
                candidate.work_mode
              )}`}
            >
              {candidate.work_mode}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
            <span className="text-sm font-semibold text-gray-600">
              {candidate.job_title}
            </span>
            <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-sm font-medium text-gray-600 truncate max-w-[150px]">
              {candidate.company}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
            <span className="flex items-center space-x-1.5">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{candidate.phone}</span>
            </span>
            <span className="truncate">{candidate.email}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 w-full">
        <a
          href={candidate.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 flex-1 h-10"
        >
          <svg
            className="w-3.5 h-3.5 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Resume
        </a>

        <button
          onClick={() =>
            candidateSelection(
              "shortlisted",
              candidate.candidate_id,
              candidate.job_id
            )
          }
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 flex-1 h-10"
        >
          <svg
            className="w-3.5 h-3.5 mr-1 sm:mr-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">Shortlist</span>
        </button>

        <button
          onClick={() =>
            candidateSelection(
              "rejected",
              candidate.candidate_id,
              candidate.job_id
            )
          }
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-red-700 bg-red-100 hover:bg-red-200 border border-red-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 flex-1 h-10"
        >
          <svg
            className="w-3.5 h-3.5 mr-1 sm:mr-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h12a1 1 0 110 2H5a1 1 0 01-1-1zM4 8a1 1 0 011-1h12a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden sm:inline">Reject</span>
        </button>
      </div>
    </div>
  );
};

export default CandidateTable;
