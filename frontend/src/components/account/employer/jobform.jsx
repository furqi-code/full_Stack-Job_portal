import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Upload } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const JobForm = ({ setshowForm }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const companyRef = useRef();
  const typeRef = useRef();
  const workModeRef = useRef();
  const locationRef = useRef();
  const experienceMinRef = useRef();
  const experienceMaxRef = useRef();
  const salaryMinRef = useRef();
  const salaryMaxRef = useRef();
  const companyLogoRef = useRef();
  // const expiresAtRef = useRef();

  const [logoFile, setLogoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const previewLogo = (e) => {
    // const file = companyLogoRef.current.files[0];
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Please select a valid image file");
      }
      setLogoFile(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    companyLogoRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile) {
      return toast.error("Please upload a company logo");
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append("companyLogo", logoFile);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("company", companyRef.current.value);
    formData.append("type", typeRef.current.value);
    formData.append("work_mode", workModeRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("experience_min", experienceMinRef.current.value);
    formData.append("experience_max", experienceMaxRef.current.value);
    formData.append("salary_min", salaryMinRef.current.value);
    formData.append("salary_max", salaryMaxRef.current.value);
    // formData.append("expires_at", expiresAtRef.current.value);

    try {
      const res = await axios.post(
        "http://localhost:1111/account/employer/addJob",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Job posted successfully!");
      setTimeout(() => {
        setshowForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-5 max-w-2xl"
      >
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            ref={titleRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            ref={descriptionRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            type="text"
            ref={companyRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              ref={typeRef}
              className="select select-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              required
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Work Mode</label>
            <select
              ref={workModeRef}
              className="select select-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              required
            >
              <option value="">Select mode</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            ref={locationRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="City, Country"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              Min Exp (years)
            </label>
            <input
              type="number"
              ref={experienceMinRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Max Exp (years)
            </label>
            <input
              type="number"
              ref={experienceMaxRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Min Salary (LPA)</label>
            <input
              type="number"
              ref={salaryMinRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Max Salary (LPA)</label>
            <input
              type="number"
              ref={salaryMaxRef}
              className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
              min="0"
            />
          </div>
        </div>

        {/* Updated Company Logo Section with Custom Upload UI */}
        <div>
          <label className="block mb-2 font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Company Logo
          </label>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="file"
                ref={companyLogoRef}
                onChange={previewLogo}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <button
                type="button"
                disabled={isUploading}
                className="flex items-center justify-center w-full p-8 border-2 border-dashed border-black bg-blue-50 rounded-lg hover:border-yellow-500 hover:bg-blue-100 hover:text-yellow-500 transition-all duration-200 text-green-600 font-medium group"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  <>
                    <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-sm">
                      <p>Click to upload logo</p>
                      <p className="text-xs opacity-75">PNG, JPG up to 5MB</p>
                    </div>
                  </>
                )}
              </button>
            </div>

            {/* File Selection Status */}
            {logoFile && (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-800 font-medium">
                  ✅ {logoFile.name} selected
                </span>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                  disabled={isUploading}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* <div>
          <label className="block mb-1 font-medium">
            Expires At (optional)
          </label>
          <input
            type="date"
            ref={expiresAtRef}
            className="input input-bordered w-full border-yellow-400 bg-blue-50 focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div> */}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setshowForm(false)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg border-2 border-gray-300 hover:border-transparent hover:bg-gray-400 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none focus:ring-2 focus:ring-gray-300"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Post Job
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default JobForm;
