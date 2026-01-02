import { useEffect, useContext, useState } from "react";
import { jobContext } from "../../store/jobContext";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import JobCard from "../shared/jobCard";
import axios from "axios";

const HomeDesign = () => {
  const { getSavedJobList, isLoggedin } = useContext(jobContext);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // fetch latest jobs
  const { data: joblist = [], isLoading, isError } = useQuery({
    queryKey: ["joblist"],
    queryFn: () => axios.get("http://localhost:1111/joblist?mode=homepage").then((res) => res.data.data),
    staleTime: 10000
  });

  // fetch searched jobs
  const debounce = (fn, delay) => {
    let timer ;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay)
    }
  }

  const manageSearching = async() => {
    setSearchLoading(true);
    try {
      const res = await axios.get("http://localhost:1111/joblist", {
        params: { mode: 'homepage', searchText: searchText.trim() }
      });
      setSearchLoading(false);
      setSearchedJobs(res.data.data);
    } catch (error) {
      setSearchLoading(false);
      setSearchError(true);
      console.error('Search failed:', error);
    }
  }

  const debouncedSearch = debounce(manageSearching, 1000);

  const handleSearchedText = async (event) => {
    console.log('typing / backspacing: ', event.target.value.trim())
    if (!event.target.value.trim()) {
      setSearchedJobs([]);
      setSearchLoading(false);
      setSearchError(false);
      return;
    }
    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
  }

  // because the API call to set the authentication cookie is asynchronous,
  // the useEffect hook on this page runs before the /auth/status API call in the context provider completes, causing isLoggedin to be undefined.
  // To handle this, we added isLoggedin as a dependency here, so it runs after every the login and change the state of the savedJobList.
  useEffect(() => {
    if (isLoggedin) {
      getSavedJobList();
    }
  }, [isLoggedin]);

  return (
    <>
      <div style={{ backgroundColor: "#e6f4ea" }} className="w-full">
        <main className="flex flex-col items-center justify-center px-6 py-12 min-h-[calc(100vh-8rem)] max-w-7xl mx-auto">
          <div className="w-full py-8 grid grid-cols-1 md:grid-cols-6 gap-10 items-center">
            <div className="md:col-span-3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
                Find a job with <br /> your interest and <br /> abilities
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0">
                Find jobs that match your interests with us. This portal
                provides a place to find your ideal jobs.
              </p>
              <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition cursor-pointer">
                Get Started
              </button>
            </div>
            <div className="md:col-span-3 flex justify-center">
              <img
                src="https://indiaeducation.net/wp-content/uploads/2022/07/information_technology.jpg"
                alt="Information Technology"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
          <div className="my-10 mt-20 w-full mx-auto">
            <div className="flex justify-center items-center space-x-4 text-center mb-15">
              <div className="flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search your Job"
                  value={searchText}
                  onChange={handleSearchedText}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0 mt-6">
              {searchError && (
                 <div className="col-span-full text-center py-12 text-gray-500 text-xl">
                  something is wrong!! Failed to load jobs.
                </div>
              )}
              {searchLoading && (
                <div className="col-span-full flex justify-center items-center text-center min-h-[200px] py-12">
                   <svg
                    className="animate-spin h-8 w-8 text-green-600 mr-4 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="text-gray-600 text-lg">Searching...</span>
                </div>
              )}
              {!searchError && searchedJobs.length > 0 ? (
                searchedJobs.map((job) => (
                  <Link to={`/jobs/${job.id}`} key={job.id}>
                    <JobCard job={job} />
                  </Link>
                ))
              ) : searchText && !searchError && !searchLoading && (
                <div className="col-span-full text-center py-12 text-gray-500 text-xl">
                  the job you are looking for isn't available right now.
                </div>
              )}
            </div>
          </div>
          <section className="my-10 w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Featured Job Openings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
              {isError ? (
                <div className="col-span-full text-center py-12 text-gray-500 text-xl">
                  Failed to load jobs
                </div>
              ) : isLoading ? (
                <div
                  className="flex justify-center items-center text-center min-h-[300px]"
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                >
                  <svg
                    className="animate-spin h-8 w-8 text-green-600 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="text-gray-600 text-lg">
                    Loading list of jobs...
                  </span>
                </div>
              ) : joblist.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500 text-xl">
                  No featured jobs available right now.
                </div>
              ) : (
                joblist.slice(-5).reverse().map((job) => (
                  <Link to={`/jobs/${job.id}`} key={job.id}>
                    <JobCard job={job} />
                  </Link>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default HomeDesign;
