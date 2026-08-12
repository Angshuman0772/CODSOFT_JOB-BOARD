import { useNavigate } from "react-router-dom";
import { manageJobsData } from "../assets/assets";
import "../styles/ManageJobs.css";
const ManageJobs = () => {
  const navigate = useNavigate();
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
            {manageJobsData.map((job, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <td>{job.location}</td>
                <td>{job.applicants}</td>
                <td>
                  <input type="checkbox" checked={job.visible} readOnly />
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
