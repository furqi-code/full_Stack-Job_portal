import { useState } from "react";
import axios from "axios";

const JobDetail = () => {
  // Dummy hardcoded job data 
  const job = {
    title: "Senior Frontend Developer",
    company: "Oracle",
    type: "Contract",
    workMode: "Remote",
    salary_min: 12,
    salary_max: 18,
    location: "Bangalore",
    description:
      "Develop and maintain user-friendly web applications with modern technologies, ensuring seamless user experience and responsive design.",
    experience_min: 4,
    experience_max: 6,
    applications: [1, 2, 3, 4],
    createdAt: "2025-11-15T10:00:00Z",
  };

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

  const modeColor = getModeColor(job.workMode);
  const typeColor = getTypeColor(job.type);
  const isApplied = false;

  return (
    <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
          <div className="mt-2 flex flex-wrap gap-4">
            <span
              className={`inline-block ${typeColor} rounded-full px-3 py-1 text-sm font-semibold`}
            >
              {job.type}
            </span>
            <span   
              className={`inline-block ${modeColor} rounded-full px-3 py-1 text-sm font-semibold`}
            >
              {job.workMode}
            </span>
            <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
              {job.location}
            </span>
          </div>
        </div>
        <button
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white font-bold transition-colors duration-300 ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>

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
            <h3 className="font-bold">Company</h3>
            <p className="pl-4">{job.company}</p>
          </div>
          <div>
            <h3 className="font-bold">Description</h3>
            <p className="pl-4 leading-relaxed">{job.description}</p>
          </div>
          <div>
            <h3 className="font-bold">Work Mode</h3>
            <p className="pl-4">{job.workMode}</p>
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
            <h3 className="font-bold">Total Applicants</h3>
            <p className="pl-4">{job.applications.length}</p>
          </div>
          <div>
            <h3 className="font-bold">Posted Date</h3>
            <p className="pl-4">{job.createdAt.split("T")[0]}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
