/**
 * Recruiter applications review page.
 *
 * Purpose: show applicants for posted jobs and expose accept/reject action affordances.
 */
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/ViewApplications.css";

/**
 * Renders a tabular applicant list for recruiter review workflows.
 *
 * @returns {JSX.Element} Applications table UI.
 * @sideeffects None in current mock-data implementation.
 */
const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  // function to fetch company job applications data from the backend API
  const fetchCompanyJobApplications = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, companyToken]);

  // function to update job application status (accept/reject) in the backend API
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        {
          headers: { token: companyToken },
        },
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobApplications();
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
      fetchCompanyJobApplications();
    }
  }, [companyToken, fetchCompanyJobApplications]);
  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
      <div className="applications-page">
        <div className="applications-card">
          <table className="applications-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="applicant-info">
                        <img src={applicant.userId.image} alt="" />
                        <span>{applicant.userId.name}</span>
                      </div>
                    </td>

                    <td>{applicant.jobId.title}</td>

                    <td>{applicant.jobId.location}</td>

                    <td>
                      <a
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-link"
                      >
                        View Resume
                      </a>
                    </td>

                    <td>
                      {applicant.status === "pending" ? (
                        <div className="action-menu">
                          <button className="menu-btn">⋮</button>

                          <div className="action-dropdown">
                            <button
                              className="accept-btn"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "accepted",
                                )
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "rejected",
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className={`status-badge ${applicant.status}`}>
                          {applicant.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <div> Loading </div>
  );
};

export default ViewApplications;
