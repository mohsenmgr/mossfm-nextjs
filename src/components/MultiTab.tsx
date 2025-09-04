import React, { useState } from "react";
import Chip from "./Chip";

export type Job = {
  title: string;
  location: string;
  dateStart: string;
  dateFinish: string;
  jobDescription: string;
  responsibilities: {
    title: string;
    items: string[];
  };
  skills?: string[];
};

interface MultiTabProps {
  job: Job;
}

function MultiTab({ job }: MultiTabProps) {
  // React state for tabs
  const [activeTab, setActiveTab] = useState<"about" | "services">("about");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* TAB HEADERS */}
        <ul
          className="bg-[rgba(13,52,58,1)] flex flex-wrap text-sm font-medium text-center border-b border-gray-200 rounded-t-lg dark:border-gray-700 dark:text-green-100"
          role="tablist"
        >
          <li className="me-2">
            <button
              id="about-tab"
              type="button"
              role="tab"
              aria-controls="about"
              aria-selected={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              className={`inline-block p-4 rounded-ss-lg transition-colors ${
                activeTab === "about"
                  ? "text-green-400"
                  : "text-green-100 hover:text-green-400"
              }`}
            >
              Job
            </button>
          </li>
          <li className="me-2">
            <button
              id="services-tab"
              type="button"
              role="tab"
              aria-controls="services"
              aria-selected={activeTab === "services"}
              onClick={() => setActiveTab("services")}
              className={`inline-block p-4 transition-colors ${
                activeTab === "services"
                  ? "text-green-400"
                  : "text-green-100 hover:text-green-400"
              }`}
            >
              Responsibilities
            </button>
          </li>
        </ul>

        {/* TAB CONTENT */}
        <div
          id="tab-content"
          className="bg-[rgba(13,52,58,1)] p-4 rounded-lg md:p-8"
        >
          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div id="about" role="tabpanel" aria-labelledby="about-tab">
              <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {job.title}
              </h2>
              <p className="mb-4 text-sm text-gray-300 italic">
                📍 {job.location} — {job.dateStart} to {job.dateFinish}
              </p>
              <p className="mb-3 text-gray-100">{job.jobDescription}</p>
            </div>
          )}

          {/* RESPONSIBILITIES TAB */}
          {activeTab === "services" && (
            <div id="services" role="tabpanel" aria-labelledby="services-tab">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {job.responsibilities.title}
              </h2>
              <ul
                role="list"
                className="space-y-4 text-gray-500 dark:text-gray-400"
              >
                {job.responsibilities.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex space-x-2 rtl:space-x-reverse items-center"
                  >
                    <svg
                      className="shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CHIPS */}
      {job.skills && (
        <div className="flex gap-2 flex-wrap my-4">
          {job.skills.map((skill, idx) => (
            <Chip key={idx} text={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiTab;