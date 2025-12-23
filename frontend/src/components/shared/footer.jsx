const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <svg
                  class_utils="h-8 w-auto text-indigo-600 dark:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-8 w-auto text-indigo-600 dark:text-indigo-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                <span className="ml-2 text-2xl font-bold text-slate-900 dark:text-white">
                  JobNest
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Connecting talent with opportunity. Find your next career move
                with JobNest.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Find Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Companies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; 2025 JobNest. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/"
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/furqi-code"
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="sr-only">Github</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.418 2.865 8.166 6.839 9.506.5.091.682-.217.682-.482 
      0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.909-.62.069-.608.069-.608
      1.004.07 1.532 1.031 1.532 1.031.893 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.114-4.555-4.951
      0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.563 9.563 0 0112 6.844c.85.004 1.705.115 
      2.504.338 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 
      4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138
      20.182 22 16.438 22 12.021 22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/md-furqan-ahmad-81551338b/"
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
