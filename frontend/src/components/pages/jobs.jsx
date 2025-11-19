import { useState } from "react";
import JobCard from "../shared/jobCard";
import axios from "axios";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Kolkata", "Mumbai"],
  },
  {
    filterType: "Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Network Engineer",
      "Data Analyst",
      "DevOps",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1L", "1L to 5L", "7L to 11L"],
  },
];

const Jobs = () => {
  const [clicked, setClicked] = useState("");

  const handleChange = (event) => {
    setClicked(event.target.value);
    // make API call here for matching jobs
  };

  return (
    <>
      <div
        className="min-h-[calc(100vh-4rem-4rem)]"
        style={{ backgroundColor: "#e5e5e5" }}
      >
        {/* Padding controls spacing from header */}
        <div className="pt-10 pb-15 px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Job Listings
          </h1>
          <div className="flex gap-10">
            <div
              className="w-61 p-4 bg-white rounded-lg shadow-md sticky top-30 h-fit"
              style={{ backgroundColor: "#e6f4ea" }}
            >
              {filterData.map((filter) => (
                <div className="mb-5" key={filter.filterType}>
                  <h2 className="mb-3 text-sm font-semibold text-gray-600">
                    Filter by {filter.filterType}
                  </h2>
                  <div className="flex flex-col gap-1">
                    {filter.array.map((data) => (
                      <label
                        className="inline-flex items-center cursor-pointer text-sm text-gray-700"
                        key={data}
                      >
                        <input
                          type="radio"
                          name={filter.filterType}
                          value={data}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          checked={clicked === data}
                          onChange={handleChange}
                        />
                        <span className="ml-2">{data}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-3 gap-8">
                {/* Map your job cards here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
