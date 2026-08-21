/**
 * Recruiter manage-jobs page.
 *
 * Purpose: list company postings and provide visibility toggling controls.
 */
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/ManageJobs.css";

/**
 * Renders recruiter-owned jobs with visibility controls.
 *
 * @returns {JSX.Element} Management table and add-job shortcut action.
 * @sideeffects Performs API requests and updates local job state.
 */
const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  /**
   * Fetches all jobs posted by the authenticated company.
   *
   * @returns {Promise<void>} Resolves after state synchronization.
   * @sideeffects Performs network I/O, updates jobs state, and emits toasts.
   */
  const fetchCompanyJobs = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/jobs", {
        headers: {
          token: companyToken,
        },
      });
      if (data.success) {
        setJobs([...data.jobsData].reverse());
        // console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, companyToken]);

  /**
   * Toggles visibility for a specific job posting.
   *
   * @param {string} jobId - Job document identifier.
   * @returns {Promise<void>} Resolves after server update and list refresh.
   * @sideeffects Performs network I/O, updates backend state, and triggers a jobs refetch.
   */
  const changeJobVisibility = async (jobId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id: jobId },
        {
          headers: {
            token: companyToken,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchCompanyJobs();
    }
  }, [companyToken, fetchCompanyJobs]);
  return (
    <div className="manage-jobs-page">
      <div className="manage-jobs-card">
        <table className="manage-jobs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Applicants</th>
              <th>Visible</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <td>{job.location}</td>
                <td>{job.applicants}</td>
                <td>
                  <input
                    onChange={() => changeJobVisibility(job._id)}
                    type="checkbox"
                    checked={job.visible}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-job-btn-container">
        <button
          className="add-job-btn"
          onClick={() => navigate("/dashboard/add-jobs")}
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
