const CandidateTable = ({ candidate }) => {
  const getModeColor = (mode) => {
    if (mode === "Hybrid") return "bg-yellow-100 text-yellow-700";
    if (mode === "Remote") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };
  
  const getStatusColor = (type) => {
    const trimmedType = type.trim();
    if (trimmedType === "pending") return "bg-yellow-100 text-yellow-700";
    if (trimmedType === "shortlisted") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  const modeColor = getModeColor(candidate.work_mode);
  const statusColor = getStatusColor(candidate.status);

  return (
    <div className="group flex items-center justify-between p-3 border border-gray-200/50 rounded-lg hover:border-blue-300 hover:shadow-sm hover:shadow-black/10 transition-all duration-200 bg-gradient-to-r from-amber-900/10 via-white/95 to-blue-50/90 h-16">
      {/* Logo & Candidate Info - Compact */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Company Logo - Smaller */}
        {candidate.companyLogo && (
          <img
            src={candidate.companyLogo}
            alt={candidate.company}
            className="w-8 h-8 rounded object-cover flex-shrink-0 ring-1 ring-white/60 shadow-sm"
          />
        )}
        
        {/* Candidate Details - Ultra compact */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs truncate group-hover:text-gray-900">
            {candidate.job_role || candidate.title}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {candidate.company} • {candidate.location}
          </p>
        </div>
      </div>

      {/* Work Mode Badge */}
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeColor} flex-shrink-0 shadow-sm`}>
        {candidate.work_mode}
      </span>
      <a href={candidate.resume_url}>📄 Resume</a>   

      {/* Status Badge - Right aligned */}
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ml-2 ${statusColor} flex-shrink-0`}>
        {candidate.status?.toUpperCase()}
      </span>

      <button>shortlist</button>
      <button>reject</button>
    </div>
  );
};

export default CandidateTable;
