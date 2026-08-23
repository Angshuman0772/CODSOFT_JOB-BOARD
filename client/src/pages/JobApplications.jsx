import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "@clerk/react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/JobApplications.css";

const JobApplications = () => {
  const { getToken } = useAuth();

  const {
    resume,
    setResume,
    backendUrl,
    userData,
    fetchUserData,
    userApplications,
  } = useContext(AppContext);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);
  };

  const handleResumeUpload = async () => {
    if (!resume) {
      toast.error("Please select a resume first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        await fetchUserData();

        setResume(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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

          {!resume && !userData?.resume && <p>No resume uploaded</p>}

          {resume && (
            <a
              href={URL.createObjectURL(resume)}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {resume.name}
            </a>
          )}

          {!resume && userData?.resume && (
            <a href={userData.resume} target="_blank" rel="noopener noreferrer">
              📄 Uploaded Resume
            </a>
          )}
        </div>

        <div className="resume-card-buttons">
          <label className="btn">
            {resume || userData?.resume ? "Upload New" : "Select Resume"}

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              hidden
            />
          </label>

          {resume && (
            <>
              <button type="button" onClick={handleResumeUpload}>
                Save Resume
              </button>

              <button type="button" onClick={() => setResume(null)}>
                Remove
              </button>
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
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {userApplications.map((job, index) => (
                <tr key={index}>
                  <td>
                    <div className="company-cell">
                      <img src={job.companyId.image} alt={job.companyId.name} />
                      <span>{job.companyId.name}</span>
                    </div>
                  </td>

                  <td>{job.jobId.title}</td>
                  <td>{job.jobId.location}</td>
                  <td>
                    {new Date(job.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

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
