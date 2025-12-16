import { useState, useRef } from "react";
import Sidebar from "./sidebar";
import axios from "axios";

const ChangePassword = () => {
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // used in sidebar
  const [profilePic, setProfilePic] = useState(""); 
  const [name, setName] = useState("");   

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (newPassword !== confirmPassword) {
      setError("new/confirm Passwords do not match");
      return;
    }
    axios({
      method: "PATCH",
      url: "http://localhost:1111/account/job_seeker/change-password",
      data: {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      withCredentials: true,
    })
      .then((res) => {
        setSuccess("Password changed successfully");
        setTimeout(() => {
          setSuccess('');
        }, 2000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <div className="py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
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
                    Change Password
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          required
                          ref={currentPasswordRef}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                  focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                          placeholder="Enter your current password"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          required
                          ref={newPasswordRef}
                          // minLength={8}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                  focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Minimum 8 characters
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          ref={confirmPasswordRef}
                          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                  focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
                          placeholder="Confirm your new password"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm mt-2 font-semibold">{error}</p>
                    )}
                    {success && (
                      <p className="text-green-500 text-sm mt-2 font-semibold">{success}</p>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 border border-transparent"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
