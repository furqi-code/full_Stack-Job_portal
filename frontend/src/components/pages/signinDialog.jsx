import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jobContext } from "../../store/jobContext";
import axios from "axios";

export function SigninDialog({
  setSignupDialog,
  setSigninDialog,
  setforgotPassDialog,
}) {
  const { setIsloggedin, setUser_type } = useContext(jobContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    axios({
      method: "POST",
      url: "http://localhost:1111/login",
      data: {
        email,
        password,
        role,
      },
      withCredentials: true,
    })
      .then((res) => {
        setSuccess("Login successful. Redirecting to home page...");
        setIsloggedin(true);
        setUser_type(res.data.user_type); 
        setTimeout(() => {
          setSigninDialog(false);
          navigate("/");
        }, 2000);
      })

      .catch(() => {
        setError("Invalid Email / Role / Password");
      });
  };

  return (
    <>
      <div
        data-dialog-backdrop="sign-in-dialog"
        data-dialog-backdrop-close="true"
        className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-transparent bg-opacity-40 backdrop-blur-lg transition-opacity duration-300"
      >
        <div
          data-dialog="sign-in-dialog"
          className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative flex flex-col bg-white">
            <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
              <h3 className="text-2xl">Sign In</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Email"
                  autoComplete="on"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Password
                </label>
                <input
                  type="password"
                  ref={passwordRef}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Password"
                  autoComplete="on"
                />
              </div>

              {/* ROLE RADIO GROUP */}
              <div className="w-full max-w-sm min-w-[200px]">
                <p className="block mb-2 text-sm text-slate-600">Select Role</p>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="job_seeker"
                      className="h-4 w-4 text-slate-800 border-slate-300 focus:ring-slate-500"
                      checked={role === "job_seeker"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-slate-700">
                      Job seeker
                    </span>
                  </label>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      className="h-4 w-4 text-slate-800 border-slate-300 focus:ring-slate-500"
                      checked={role === "employer"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-slate-700">
                      Employer
                    </span>
                  </label>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      className="h-4 w-4 text-slate-800 border-slate-300 focus:ring-slate-500"
                      checked={role === "admin"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2 text-sm text-slate-700">Admin</span>
                  </label>
                </div>
              </div>

              <div className="inline-flex justify-between items-center mt-2">
                <label
                  className="flex items-center cursor-pointer relative"
                  htmlFor="check-2"
                >
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    id="check-2"
                  />
                  <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <label
                    className="cursor-pointer ml-2 text-slate-600 text-sm"
                    htmlFor="check-2"
                  >
                    Remember Me
                  </label>
                </label>
                <p
                  onClick={() => {
                    setforgotPassDialog(true);
                    setSigninDialog(false);
                  }}
                  className="text-sm text-blue-600 underline cursor-pointer mt-2"
                >
                  Forgot Password?
                </p>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-2 font-semibold">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-2 font-semibold">
                  {success}
                </p>
              )}

              <div className="p-6 pt-0">
                <button
                  type="submit"
                  className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="mt-2 w-full rounded-md bg-red-300 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer mb-2"
                  onClick={() => setSigninDialog(false)}
                >
                  Cancel
                </button>
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Don't have an account?
                  <button
                    onClick={() => {
                      setSignupDialog(true);
                      setSigninDialog(false);
                    }}
                    className="ml-1 text-sm font-semibold text-slate-700 underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
