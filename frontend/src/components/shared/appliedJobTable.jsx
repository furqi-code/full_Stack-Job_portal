const AppliedJobTable = ({ job, onDelete }) => {
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

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(job.id);
  }

  return (
    <div className="group relative flex items-center justify-between p-3 border border-gray-200/50 rounded-lg hover:border-blue-300 hover:shadow-sm hover:shadow-black/10 transition-all duration-200 bg-gradient-to-r from-amber-900/10 via-white/95 to-blue-50/90 h-16">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Company Logo - Smaller */}
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-8 h-8 rounded object-cover flex-shrink-0 ring-1 ring-white/60 shadow-sm"
          />
        )}

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs truncate group-hover:text-gray-900">
            {job.job_role || job.title}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Right section: Work Mode, Status, and Delete */}
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeColor} flex-shrink-0 shadow-sm`}
        >
          {job.work_mode}
        </span>

        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${statusColor} flex-shrink-0`}
        >
          {job.status?.toUpperCase()}
        </span>

        {/* Delete Button - Hidden by default, shows on hover */}
        <button
          onClick={handleDelete}
          className="group-hover:opacity-100 opacity-0 p-1 rounded-full hover:bg-red-500/20 hover:text-red-600 transition-all duration-200 flex-shrink-0 ml-1 -mr-1"
          title="Withdraw application"
          aria-label="Withdraw application"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AppliedJobTable;
