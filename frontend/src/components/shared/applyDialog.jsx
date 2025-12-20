"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import axios from "axios";

export default function ApplyDialog({
  openDialog,
  setOpenDialog,
  job_id,
  success,
  setSuccess,
}) {
  const resumeFileRef = useRef(null);
  const [resumePreview, setResumePreview] = useState("");
  const [error, setError] = useState("");

  const handleResumeInputChange = (e) => {
    setError("");
    // const file = e.target.files[0];
    const file = resumeFileRef.current.files[0];
    if (file) {
      if (!file.type.startsWith("application/")) {
        return setError("Please select a valid PDF / DOC file");
      }
      if (file.size > 5 * 1024 * 1024) {
        return setError("File size must be under 5MB");
      }
      setResumePreview(file);
    }
  };

  const handleApplyJob = () => {
    setError("");
    setSuccess("");
    if (resumeFileRef.current.files.length === 0) {
      return setError("Please select a resume file first");
    }
    const formData = new FormData();
    formData.append("resume", resumeFileRef.current.files[0]);

    axios({
      method: "POST",
      url: `http://localhost:1111/account/job_seeker/apply?job_id=${job_id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      data: formData,
    })
      .then((res) => {
        console.log("resume uploaded", res.data.message);
        resumeFileRef.current.value = "";
        setResumePreview("");
        setSuccess("Resume uploaded successfully");
        setTimeout(() => {
          setSuccess("");
          setOpenDialog(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("Upload error", err);
        setError("Failed to upload your resume.");
      });
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={setOpenDialog}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen">
          <DialogPanel
            transition
            className="w-full max-w-md transform rounded-2xl bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/20 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in border border-white/10"
          >
            <div className="px-8 pt-8 pb-6 border-b border-white/10 data-closed:hidden">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-sm border border-white/20">
                  <DocumentIcon
                    className="h-6 w-6 text-blue-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-white leading-tight"
                  >
                    Upload Resume
                  </DialogTitle>
                  <Description className="mt-1 text-sm text-gray-300 leading-relaxed">
                    Please select your resume file. Supported formats: PDF, DOC,
                    DOCX (Max 5MB).
                  </Description>
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="p-8 data-closed:hidden">
              {!resumePreview ? (
                // drag-and-drop area
                <div className="group">
                  <label
                    htmlFor="resume"
                    className="block w-full cursor-pointer p-8 border-2 border-dashed border-gray-600 rounded-2xl text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-blue-500/10"
                  >
                    <DocumentIcon className="mx-auto h-16 w-16 text-gray-400 group-hover:text-blue-400 transition-colors mb-4" />
                    <div className="text-white">
                      <p className="text-lg font-semibold mb-1">
                        Choose your resume
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      id="resume"
                      ref={resumeFileRef}
                      onChange={handleResumeInputChange}
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      required
                    />
                  </label>
                </div>
              ) : (
                // Preview file area
                <div className="group">
                  <div className="p-6 bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-indigo-500/10 backdrop-blur-xl border-2 border-emerald-400/20 rounded-3xl shadow-2xl ring-1 ring-emerald-400/30 hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-blue-400/20 border border-emerald-400/30 backdrop-blur-sm p-2">
                          <DocumentIcon className="h-7 w-7 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-semibold text-white truncate group-hover:underline group-hover:underline-offset-2">
                            {resumePreview.name}
                          </p>
                          <p className="text-sm text-emerald-300/80 font-mono mt-0.5">
                            {(resumePreview.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResumePreview("");
                          if (resumeFileRef.current)
                            resumeFileRef.current.value = "";
                        }}
                        className="p-2 hover:bg-white/20 hover:text-white rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 flex items-center justify-center group/remove hover:shadow-md"
                        title="Change file"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <p className="mt-3 text-xs text-gray-500 text-center">
                PDF, DOC, DOCX up to 5MB
              </p>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
            )}
            {success && (
              <p className="mt-2 text-sm text-green-400 text-center">
                {success}
              </p>
            )}

            <div className="px-8 py-6 bg-black/20 border-t border-white/10 backdrop-blur-sm rounded-b-2xl">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenDialog(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="resume-form"
                  onClick={handleApplyJob}
                  className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:ml-3 sm:w-auto"
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
