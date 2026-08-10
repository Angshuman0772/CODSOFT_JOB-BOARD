import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import JobCards from "../components/JobCards";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import "../styles/JobsPage.css";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const { searchFilter } = useContext(AppContext);
  const { filteredJobs } = useContext(AppContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1); // Reset to the first page whenever the search filter changes
  }, [searchFilter]);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <>
      <NavBar />
      <div className="page-header">
        <h1 className="page-title">All Jobs</h1>
      </div>
      <div className="job-listing-container">
        <Sidebar showSearch={true} />
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
