import { useState, useRef, useEffect, useContext } from "react";
import { Cog6ToothIcon, CameraIcon } from "@heroicons/react/24/outline";
import { jobContext } from "../../../store/jobContext";
import Sidebar from "../sidebar";
import axios from "axios";

const Employer_profile = () => {
  const { isLoggedin } = useContext(jobContext);
  const imageFileRef = useRef(null);

  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [totalPostedJobs, setTotalPostedJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/employer/profile",
      withCredentials: true,
    })
      .then((res) => {
        const { name, phone, address, gender, profile_pic } = res.data.info;
        const { created_at } = res.data.joined; // from users table
        setFormData({
          name: name || "",
          phone: phone || "",
          address: address || "",
          gender: gender || "",
        });

        setDate(created_at);
        setProfilePic(profile_pic);
        setName(name);
        setError("");
      })
      .catch((err) => {
        console.log("Couldn't fetch user profile", err);
        setError("Failed to load profile data.");
      });
  }, [success]);

  // Account statistics data fetch
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/employer/myJobs",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.data.length > 0) setTotalPostedJobs(res.data.data.length);
      })
      .catch((err) => {
        console.log("Couldn't fetch user posted jobs", err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:1111/account/employer/applications`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.data.length > 0)
          setTotalApplications(res.data.data.length);
      })
      .catch((err) => {
        console.log("Error while fetching your applications");
      });
  }, []);

  const handleImageInputChange = (e) => {
    // const file = e.target.files[0];
    const file = imageFileRef.current.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return setError("Please select a valid image file");
      }
      setImgPreview(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("gender", formData.gender);

    if (imageFileRef.current?.files.length > 0) {
      formDataToSend.append("profile_pic", imageFileRef.current.files[0]);
    }

    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/employer/profile",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      data: formDataToSend,
    })
      .then((res) => {
        console.log("Profile updated", res.data.message);
        imageFileRef.current.value = "";
        setImgPreview("");
        setSuccess("Profile updated successfully.");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        console.log("Update error", err);
        setError("Failed to update profile.");
      });
  };

  if (!isLoggedin) {
    return (
      <div className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-10rem)] max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Please log in
          </h1>
          <p className="text-gray-600">
            Access your account to view and edit profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            name={name}
            profilePic={profilePic}
            setName={setName}
            setProfilePic={setProfilePic}
          />

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Profile Information
                </h2>
                <div className="flex gap-3">
                  {error && (
                    <div className="px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium animate-pulse">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="px-4 py-2 bg-emerald-100 border border-emerald-400 text-emerald-700 rounded-xl text-sm font-medium">
                      {success}
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSaveChanges} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col items-center space-y-3">
                  <div className="relative group">
                    <div className="aspect-square w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <img
                        src={profilePic || imgPreview}
                        alt="Profile picture"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Custom File Upload Button */}
                    <label
                      htmlFor="profile-pic"
                      className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-2xl border-4 border-white/80 hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/25 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center w-14 h-14"
                    >
                      <CameraIcon className="w-6 h-6 text-white" />
                      <input
                        id="profile-pic"
                        type="file"
                        ref={imageFileRef}
                        onChange={handleImageInputChange}
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {imgPreview && (
                    <div className="w-full max-w-[12rem] flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-lg shadow-sm">
                      <span className="text-sm text-stone-800 font-medium flex-1 pr-2 line-clamp-2">
                        {imgPreview.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setImgPreview("")}
                        className="p-1.5 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all duration-200 flex items-center justify-center hover:scale-110"
                        title="Remove file"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="City, Country"
                      required  
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-2">
                    <button
                      type="submit"
                      className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 border border-transparent"
                    >
                      <svg
                        className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Posted Jobs</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalPostedJobs}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalApplications}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {date ? date.split("T")[0] : "--"}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Employer_profile;
