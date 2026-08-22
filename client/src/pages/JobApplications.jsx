import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { jobsApplied } from "../assets/assets";
import { useAuth } from "@clerk/react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/JobApplications.css";

const JobApplications = () => {
  const { getToken } = useAuth();

  const { resume, setResume, backendUrl, userData, fetchUserData } =
    useContext(AppContext);

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

      const response = await fetch(`${backendUrl}/api/user/update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

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
