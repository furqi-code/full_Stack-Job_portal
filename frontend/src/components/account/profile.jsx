import { useState, useRef, useEffect, useContext } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { jobContext } from "../../store/jobContext";
import Sidebar from "./sidebar";
import axios from "axios";

const Profile = () => {
  const { isLoggedin } = useContext(jobContext);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const bioRef = useRef(null);
  const locationRef = useRef(null);
  const profile_picRef = useRef(null); // input field
  const [profilePic, setProfilePic] = useState(""); // <img> & used in sidebar
  const [username, setUsername] = useState(""); // used in sidebar
  const [date, setDate] = useState(null);
  const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
  const [totalSaveJobs, setTotalSaveJobs] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:1111/account/profile",
  //     headers: {
  //       Authorization: localStorage.getItem("userDetail"),
  //     },
  //   })
  //     .then((res) => {
  //       const { Email, username, Bio, location, profile_pic, created_at } =
  //         res.data.info;
  //       if (emailRef.current) emailRef.current.value = Email;
  //       if (usernameRef.current) usernameRef.current.value = username;
  //       if (bioRef.current) bioRef.current.value = Bio || "";
  //       if (locationRef.current) locationRef.current.value = location || "";
  //       if (profile_picRef.current)
  //         profile_picRef.current.value = profile_pic || "";
  //       setDate(created_at);
  //       setProfilePic(profile_pic);
  //       setUsername(username);
  //     })
  //     .catch((err) => {
  //       console.log("Couldn't fetch user profile", err);
  //       setError("Failed to load profile data.");
  //     });
  // }, [success]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const bio = bioRef.current.value;
    const location = locationRef.current.value;
    const profile_pic = profile_picRef.current.value;
    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/profile",
      headers: {
        Authorization: localStorage.getItem("userDetail"),
      },
      data: {
        email,
        username,
        location,
        bio,
        profile_pic,
      },
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
            {/* Sidebar */}
            <Sidebar
              username={username}
              profilePic={profilePic}
              setUsername={setUsername}
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
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color
                              disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Username
                          </label>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            ref={usernameRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Enter your username"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bio"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            ref={bioRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="Write a few sentences about yourself"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Brief description for your profile
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Location
                          </label>
                          <input
                            id="location"
                            name="location"
                            type="text"
                            ref={locationRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="City, Country"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="profile_pic"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Profile pic
                          </label>
                          <input
                            type="url"
                            name="profile_pic"
                            ref={profile_picRef}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                            placeholder="image link OR select from your file"
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
                            className="px-5 py-2 bg-blue-400 text-white rounded-lg border-2 border-blue-400 hover:border-transparent hover:bg-green-500 transition duration-300 ease-in-out shadow-sm cursor-grab focus:outline-none"
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
