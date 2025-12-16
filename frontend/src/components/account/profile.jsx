import { useState, useRef, useEffect, useContext } from "react";
import { Cog6ToothIcon, CameraIcon } from "@heroicons/react/24/outline";
import { jobContext } from "../../store/jobContext";
import Sidebar from "./sidebar";
import axios from "axios";

// ISSUE: Uncontrolled inputs fail to populate on initial load despite successful API fetch.
// works on navigation back from any tab due to fresh component mount/clear refs.

const Profile = () => {
  const { isLoggedin } = useContext(jobContext);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);
  const jobRoleRef = useRef(null);
  const aboutRef = useRef(null);
  const imageFileRef = useRef(null);

  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
  const [totalSaveJobs, setTotalSaveJobs] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:1111/account/job_seeker/profile",
      withCredentials: true,
    })
      .then((res) => {
        const { name, phone, address, gender, job_role, about, profile_pic, created_at } = res.data.info;
        if (nameRef.current) nameRef.current.value = name || "";
        if (phoneRef.current) phoneRef.current.value = phone || "";
        if (addressRef.current) addressRef.current.value = address || "";
        if (genderRef.current) genderRef.current.value = gender || "";
        if (jobRoleRef.current) jobRoleRef.current.value = job_role || "";
        if (aboutRef.current) aboutRef.current.value = about || "";
        setDate(created_at);
        setProfilePic(profile_pic);
        setName(name);
      })
      .catch((err) => {
        console.log("Couldn't fetch user profile", err);
        setError("Failed to load profile data.");
      });
  }, [success]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("gender", genderRef.current.value);
    formData.append("job_role", jobRoleRef.current.value);
    formData.append("about", aboutRef.current.value);
    if (imageFileRef.current.files.length > 0)
      formData.append("profile_pic", imageFileRef.current.files[0]);

    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/job_seeker/profile",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      data: formData,
    })
      .then((res) => {
        console.log("Profile updated", res.data.message);
        imageFileRef.current.value = "";
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
            {/* Profile Information Card */}
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
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative group">
                    <div className="aspect-square w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <img
                        src={profilePic || "/api/placeholder/480/480"}
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
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Click camera icon to change photo
                  </p>
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
                        type="text"
                        ref={nameRef}
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
                        type="tel"
                        ref={phoneRef}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                        placeholder="+91 98765 43210"
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
                        ref={genderRef}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="job_role"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Job Role
                      </label>
                      <select
                        id="job_role"
                        ref={jobRoleRef}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="">Select Job Role</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Network Engineer">Network Engineer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Cloud Engineer">Cloud Engineer</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="AI Researcher">AI Researcher</option>
                        <option value="Data Analyst">Data Analyst</option>
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
                      type="text"
                      ref={addressRef}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                      placeholder="City, State, Country"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      About
                    </label>
                    <textarea
                      id="about"
                      rows={4}
                      ref={aboutRef}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-vertical placeholder-gray-400"
                      placeholder="Tell us about yourself and your professional background..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum 400 characters recommended  
                    </p>
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
                  <p className="text-sm text-gray-500">Applied Jobs</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalAppliedJobs}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Saved Jobs</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {totalSaveJobs}
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

export default Profile;
