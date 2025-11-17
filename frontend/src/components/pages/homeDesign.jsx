import JobCard from "../shared/jobCard";

const HomeDesign = () => {
  return (
    <div style={{ backgroundColor: "#e6f4ea" }} className="w-full">
      <main className="flex flex-col items-center justify-center px-6 py-12 min-h-[calc(100vh-8rem)] max-w-7xl mx-auto">
        <div className="w-full py-8 grid grid-cols-1 md:grid-cols-6 gap-10 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
              Find a job with <br /> your interest and <br /> abilities
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-md mx-auto md:mx-0">
              Find jobs that match your interests with us. This portal provides
              a place to find your ideal jobs.
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300 ease-in-out"
              />
            </div>
            <button className="px-5 py-2 text-sm bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out cursor-pointer">
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0 mt-6">
            {/* Map your job cards here */}
          </div>
        </div>

        <section className="my-10 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Featured Job Openings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {/* Map your job cards here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeDesign;
