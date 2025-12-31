import { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jobContext } from "../../store/jobContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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
      "Network Engineer",
      "DevOps Engineer",
      "Cloud Engineer",
      "AI Researcher",
      "Data Analyst",
      "Sales Executive",
    ],
  },
  {
    filterType: "Salary",
    array: ["4L to 6L", "7L to 11L", "12L to 15L", "16L to 45L", "45LPA +"],
  },
];

const Jobs = () => {
  const { getSavedJobList, isLoggedin } = useContext(jobContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = 5;
  const limit = pageSize
  const [skip, setSkip] = useState(0);
  const filterBy = searchParams.get("filter");
  const filterType = searchParams.get("filterType");
  const clicked = filterBy || "";

  const fetchJoblist = () => {
    return axios({
      method: "GET",
      url: "http://localhost:1111/joblist",
      params:
        filterBy && filterType ? { filterBy, filterType } : { limit, skip },
    })
      .then((res) => {
        return res.data; 
      })
      .catch((err) => {
        console.error("API failed:", err.message);
        throw err; // necessary for react Query retries if using .catch block
      });
  };

  const { data: result, isLoading, isError } = useQuery({
    queryKey: ["joblist", filterBy, filterType, skip],
    queryFn: fetchJoblist,
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });

  const joblist = result?.data || [];
  const totalJobs = result?.total || 0;
  const hasPrevPage = skip > 0;
  const hasNextPage = skip + pageSize < totalJobs;

  useEffect(() => {
    if (isLoggedin) {
      getSavedJobList();
    }
  }, [isLoggedin]);

  // on select Filter
  const handleChange = (value, filterType) => {
    setSearchParams({ filter: value, filterType });
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
              className="w-61 p-4 bg-white rounded-lg shadow-md sticky top-24 h-fit"
              style={{ backgroundColor: "#e6f4ea" }}
            >
              {filterData.map((filter) => (
                <div className="mb-5" key={filter.filterType}>
                  <h2 className="mb-3 text-sm font-bold text-gray-600">
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
                          onChange={(event) =>
                            handleChange(event.target.value, filter.filterType)
                          }
                        />
                        <span className="ml-2">{data}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="mt-4 px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-grab"
                onClick={() => setSearchParams()}
              >
                Clear Filters
              </button>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <p className="text-gray-600 text-lg">
                    Loading list of jobs...
                  </p>
                </div>
              ) : isError ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <p className="text-red-600 text-lg">Failed to load jobs</p>
                </div>
              ) : joblist.length > 0 ? (
                <div className="grid grid-cols-3 gap-8">
                  {joblist.map((job) => (
                    <Link to={`/jobs/${job.id}`} key={job.id}>
                      <JobCard job={job} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    padding: "40px",
                    backgroundColor: "#f0f4f8",
                    borderRadius: "8px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily:
                        "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 300,
                      fontSize: "1.5rem",
                      color: "#555",
                      textAlign: "center",
                    }}
                  >
                    No jobs available right now
                  </h2>
                </div>
              )}
              {!filterBy && !filterType && !isLoading && !isError && joblist.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="w-80 px-4 py-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                      <button
                        disabled={!hasPrevPage}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                        onClick={() => hasPrevPage && setSkip((prev) => prev - pageSize)}
                      >
                        Prev
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        Page {skip / pageSize + 1}
                      </span>
                      <button
                        disabled={!hasNextPage}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                        onClick={() => hasNextPage && setSkip((prev) => prev + pageSize)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Jobs;
