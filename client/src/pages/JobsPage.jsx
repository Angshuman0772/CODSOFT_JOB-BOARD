import { useState } from "react";
import { jobsData } from "../assets/assets";
import JobCards from "../components/JobCards";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import "../styles/JobsPage.css";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 9;

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobsData.slice(startIndex, startIndex + jobsPerPage);

  const totalPages = Math.ceil(jobsData.length / jobsPerPage);

  return (
    <>
      <NavBar />
      <div className="jobs-page-header">
        <h1 className="jobs-page-title">All Jobs</h1>
      </div>
      <div className="job-listing-container">
        <Sidebar />
        <JobCards jobs={currentJobs} />
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Jobs;
