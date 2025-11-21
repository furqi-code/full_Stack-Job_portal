import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SignupDialog } from "../pages/signupDialog";
import { SigninDialog } from "../pages/signinDialog";
import { ForgotPassDialog } from "../pages/forgotPassworDialog";
import { jobContext } from "../../store/jobContext";
import axios from "axios";

const Header = () => {
  const [signupDialog, setSignupDialog] = useState(false);
  const [signinDialog, setSigninDialog] = useState(false);
  const [forgotPassDialog, setforgotPassDialog] = useState(false);
  const { isLoggedin, setIsloggedin, setSaveJobList } = useContext(jobContext);
  const navigate = useNavigate();

  const logout = () => {
    axios({
      method: "POST",
      url: "http://localhost:1111/logout",
      withCredentials: true,
    }).then(() => {
      setIsloggedin(false);
      setSaveJobList([]);
      navigate("/");
    });
  };

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-300 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 min-w-0">
              <svg
                className="h-10 w-10 text-green-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 6h-2V4c0-1.11-.89-2-2-2H8c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM8 4h8v2H8V4zm12 15H4V8h16v11z" />
                <circle cx="12" cy="13" r="2" />
              </svg>
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-gray-900 truncate">
                  Job Nest
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block truncate">
                  Find your Dream Job
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    to="/"
                    className="nav-link text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
                  >
                    Home
                  </Link>
                </li>
                {["Jobs", "Profile"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item}`}
                      className="nav-link text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedin ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSigninDialog(true)}
                    className="px-5 py-2 border-2 border-gray-400 text-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out focus:outline-none cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupDialog(true)}
                    className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out shadow-sm cursor-pointer focus:outline-none"
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="px-5 py-2 border-2 border-red-400 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 ease-in-out focus:outline-none cursor-pointer"
                >
                  Logout
                </button>
              )}
            </div>
            {signupDialog && (
              <SignupDialog
                setSigninDialog={setSigninDialog}
                setSignupDialog={setSignupDialog}
              />
            )}
            {signinDialog && (
              <SigninDialog
                setSignupDialog={setSignupDialog}
                setSigninDialog={setSigninDialog}
                setforgotPassDialog={setforgotPassDialog}
              />
            )}
            {/* this btn inside login diagnol */}
            {forgotPassDialog && (
              <ForgotPassDialog
                setforgotPassDialog={setforgotPassDialog}
                setSigninDialog={setSigninDialog}
              />
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
