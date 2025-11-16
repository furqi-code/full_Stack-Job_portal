import { useRef, useState } from "react";
import axios from "axios";

export function ForgotPassDialog({ showforgotPassDialog }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const email = emailRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios({
      method: "PATCH",
      url: "http://localhost:1111/forgotPassword",
      data: {
        email,
        newPassword,
        confirmPassword,
      },
    })
      .then((res) => {
        setSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          showforgotPassDialog(false);
        }, 2000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
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
              <h3 className="text-2xl">Forgot Password</h3>
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
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  New Password
                </label>
                <input
                  type="newpassword"
                  ref={newPasswordRef}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Password"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Confirm Password
                </label>
                <input
                  type="confirmpassword"
                  ref={confirmPasswordRef}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your Password"
                />
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
                  Save 
                </button>
                <button
                  type="button"
                  className="mt-2 w-full rounded-md bg-red-300 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer mb-2"
                  onClick={() => showforgotPassDialog(false)}
                >
                  Cancel
                </button>
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Remember your password?
                  <button
                    onClick={() => {
                      showforgotPassDialog(false);
                    }}
                    className="ml-1 text-sm font-semibold text-slate-700 underline cursor-pointer"
                  >
                    Sign in
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
