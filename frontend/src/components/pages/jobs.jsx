import { useEffect, useState } from "react";
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
      "Sales Executive",
      "AI Researcher",
      "Data Analyst",
    ],
  },
  {
    filterType: "Salary",
    array: ["4L to 6L", "7L to 11L", "12L to 15L", "16L to 22L"],
  },
];

const Jobs = () => {
  const [clicked, setClicked] = useState("");
  const [cancelClicked, setCancelClicked] = useState(true);
  const [joblist, setJoblist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("joblist in job page\n", joblist);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:1111/joblist",
    })
      .then((res) => {
        setJoblist(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Couldn't fetch joblist");
        setLoading(false);
      });
  }, [cancelClicked]);

  // on select Filter
  const handleChange = (value, filterType) => {
    setLoading(true);
    setClicked(value);
    console.log("clicked filter - ", clicked); // undefined bcz immediate re-render nhi hota
    axios({
      method: "GET",
      url: "http://localhost:1111/joblist",
      params: {
        filterBy: value,
        filterType,
      },
    })
      .then((res) => {
        setJoblist(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to load jobs based on your selected filter. Please try again!!");
        setLoading(false);
      });
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
                          onChange={(event) => handleChange(event.target.value, filter.filterType)}
                        />
                        <span className="ml-2">{data}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="mt-4 px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-grab"
                onClick={() => {
                  setCancelClicked(!cancelClicked);
                  setClicked("");
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <p className="text-gray-600 text-lg">
                    Loading list of jobs...
                  </p>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              ) : joblist.length > 0 ? (
                <div className="grid grid-cols-3 gap-8">
                  {joblist.map((job) => (
                    <JobCard job={job} />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
