import { useState, useRef, useEffect, useContext } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { jobContext } from "../../store/jobContext";
import Sidebar from "./sidebar";
import axios from "axios";

const Profile = () => {
  const { isLoggedin } = useContext(jobContext);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);
  const jobRoleRef = useRef(null);
  const aboutRef = useRef(null);
  const profile_picRef = useRef(null);

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
      withCredentials: true
    })
      .then((res) => {
        const { name, phone, address, gender, job_role, about, profile_pic, created_at } = res.data.info;
        if (nameRef.current) nameRef.current.value = name || "";
        if (phoneRef.current) phoneRef.current.value = phone || "";
        if (addressRef.current) addressRef.current.value = address || "";
        if (genderRef.current) genderRef.current.value = gender || "";
        if (jobRoleRef.current) jobRoleRef.current.value = job_role || "";
        if (aboutRef.current) aboutRef.current.value = about || "";
        if (profile_picRef.current) profile_picRef.current.value = profile_pic || "";
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

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const gender = genderRef.current.value;
    const job_role = jobRoleRef.current.value;
    const about = aboutRef.current.value;
    const profile_pic = profile_picRef.current.value;

    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/job_seeker/profile",
      data: {
        name,
        phone,
        address,
        gender,
        job_role,
        about,
        profile_pic,
      },
      withCredentials: true
    })
      .then((res) => {
        console.log("Profile updated", res.data.message);
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
      <div className="flex items-center justify-center px-6 py-8 min-h-[calc(100vh-10rem)] max-w-7xl mx-auto">
        <h1>Kindly login to see your account</h1>
      </div>
    );
  }

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Updated props */}
            <Sidebar
              name={name}
              profilePic={profilePic}
              setName={setName}
              setProfilePic={setProfilePic}
            />

            {/* Main Content */}
            <main className="flex-1">
              <div className="space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Information
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="aspect-square w-full max-w-[200px] mx-auto relative">
                        <img
                          src={profilePic}
                          alt="Profile pic"
                          className="rounded-full w-full h-full object-cover"
                        />
                        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 cursor-pointer">
                          <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <form onSubmit={handleSaveChanges} className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            ref={nameRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            ref={phoneRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="+91 9876543210"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Address
                          </label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            ref={addressRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="City, State, Country"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            ref={genderRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
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
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Job Role
                          </label>
                          <select
                            id="job_role"
                            name="job_role"
                            ref={jobRoleRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            defaultValue=""
                          >
                            <option value="" disabled>Select Job Role</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Network Engineer">Network Engineer</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Cloud Engineer">Cloud Engineer</option>
                            <option value="Sales Executive">Sales Executive</option>
                            <option value="AI Researcher">AI Researcher</option>
                            <option value="Data Analyst">Data Analyst</option>
                            {/* <option value="UX Designer">UX Designer</option>
                            <option value="Marketing Specialist">Marketing Specialist</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Mobile Developer">Mobile Developer</option>
                            <option value="Cybersecurity Specialist">Cybersecurity Specialist</option> */}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            About
                          </label>
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            ref={aboutRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Write a few sentences about yourself"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Brief description for your profile
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="profile_pic"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Profile Picture
                          </label>
                          <input
                            type="url"
                            id="profile_pic"
                            name="profile_pic"
                            ref={profile_picRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Image URL"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm mt-2 font-semibold">
                            {error}
                          </p>
                        )}
                        {success && (
                          <p className="text-green-500 text-sm mt-2 font-semibold">
                            {success}
                          </p>
                        )}

                        <div className="pt-4">
                          <button
                            type="submit"
                            className="px-5 py-2 bg-green-600 text-white rounded-lg border-2 border-green-600 hover:border-transparent hover:bg-blue-400 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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
                        {date ? date.split("T")[0] : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
