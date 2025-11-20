const JobCard = ({ job }) => {
  const getModeColor = (mode) => {
    if (mode === "Hybrid") return "bg-yellow-100 text-yellow-700";
    if (mode === "Remote") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };
  const modeColor = getModeColor(job.work_mode);

  return (
    <>
      <div className="job-card bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={`${modeColor} px-3 py-1 rounded-full text-sm font-medium`}
          >
            {job.work_mode}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-4">
          {job.title} • {job.type}
        </p>
        <p className="text-gray-700 mb-6">{job.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            {job.salary_min} - {job.salary_max} LPA
          </span>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-grab">
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCard;
