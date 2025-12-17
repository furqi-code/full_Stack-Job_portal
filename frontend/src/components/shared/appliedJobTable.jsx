const AppliedJobTable = ({ job }) => {
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

  const modeColor = getModeColor(job.work_mode);
  const statusColor = getStatusColor(job.status);

  return (
    <div className="group flex items-center justify-between p-3 border border-gray-200/50 rounded-lg hover:border-blue-300 hover:shadow-sm hover:shadow-black/10 transition-all duration-200 bg-gradient-to-r from-amber-900/10 via-white/95 to-blue-50/90 h-16">
      {/* Logo & Job Info - Compact */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Company Logo - Smaller */}
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-8 h-8 rounded object-cover flex-shrink-0 ring-1 ring-white/60 shadow-sm"
          />
        )}
        
        {/* Job Details - Ultra compact */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs truncate group-hover:text-gray-900">
            {job.job_role || job.title}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Work Mode Badge */}
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeColor} flex-shrink-0 shadow-sm`}>
        {job.work_mode}
      </span>

      {/* Status Badge - Right aligned */}
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ml-2 ${statusColor} flex-shrink-0`}>
        {job.status?.toUpperCase()}
      </span>
    </div>
  );
};

export default AppliedJobTable;
