import { useState } from "react";
import { jobsApplied } from "../assets/assets";
import Navbar from "../components/Navbar";
import "../styles/JobApplications.css";
const JobApplications = () => {
  const [resume, setResume] = useState(null);
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };
  return (
    <>
      <Navbar />
      <div className="page-header">
        <h1 className="page-title">Job Applications</h1>
      </div>

      <div className="resume-card">
        <div className="resume-card-content">
          <h3>Resume</h3>

          {!resume ? (
            <>
              <p>No resume uploaded</p>

              <label className="upload-area">
                Select Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  hidden
                />
              </label>
            </>
          ) : (
            <a
              href={URL.createObjectURL(resume)}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {resume.name}
            </a>
          )}
        </div>

        <div className="resume-card-buttons">
          {resume && (
            <>
              <label className="btn">
                Upload New
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  hidden
                />
              </label>

              <button onClick={() => setResume(null)}>Remove</button>
            </>
          )}
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-header">
          <h3>Jobs Applied</h3>
        </div>
        <div className="stats-grid">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index}>
                  <td>
                    <div className="company-cell">
                      <img src={job.logo} alt={job.company} />
                      <span>{job.company}</span>
                    </div>
                  </td>

                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.date}</td>

                  <td>
                    <span
                      className={`status-badge ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobApplications;
