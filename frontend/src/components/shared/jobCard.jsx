const JobCard = () => {
  return (
    <>
      <div className="job-card bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">M</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Remote
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Product Manager</h3>
        <p className="text-gray-600 mb-4">Microsoft • Remote</p>
        <p className="text-gray-700 mb-6">
          Lead product strategy and work with cross-functional teams to deliver
          innovative solutions.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">$140k - $200k</span>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-grab">
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCard;
