/**
 * Job details page.
 *
 * Purpose: display a single job posting with full description and metadata.
 */
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { assets } from "../assets/assets";
import "../styles/JobDetails.css";

/**
 * Resolves and renders job details for the route id.
 *
 * @returns {JSX.Element} Job details view or fallback message.
 * @sideeffects Fetches backend job details and updates component state.
 */
const JobDetails = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [job, setJob] = useState(null);

  // fetch job details from backend
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/jobs/${id}`);
        const data = await response.json();
        setJob(data.success ? data.job : null);
      } catch {
        setJob(null);
      }
    };

    fetchJobDetails();
  }, [backendUrl, id]);

  if (!job) {
    return <h2>Job not found</h2>;
  }

  return (
    <>
      <Navbar />
      <section className="page-header">
        <h1 className="page-title">Job Details</h1>
      </section>

      <section className="job-details-container">
        {/* LEFT */}
        <div className="job-main">
          <div className="job-header">
            <img src={job.companyId.image} alt="" className="company-logo" />

            <div>
              <h2>{job.title}</h2>
              <p>{job.companyId.name}</p>
            </div>
          </div>

          <div className="job-info">
            <span>
              <img src={assets.suitcase_icon} alt="" />
              {job.category}
            </span>

            <span>
              <img src={assets.money_icon} alt="" />${job.salary}
            </span>

            <span>
              <img src={assets.location_icon} alt="" />
              {job.location}
            </span>
          </div>

          <div className="job-description-header">
            <h2>Job Description</h2>
          </div>
          <div
            className="job-description"
            dangerouslySetInnerHTML={{
              // Job descriptions are authored in rich-text (Quill) and stored as HTML.
              __html: job.description,
            }}
          />
        </div>

        {/* RIGHT */}
        <aside className="job-sidebar">
          <Link to="/applications" className="apply-btn">
            Apply Job
          </Link>

          <div className="job-overview">
            <h3>Job Overview</h3>

            <div>
              <strong>Title</strong>
              <p>{job.title}</p>
            </div>

            <div>
              <strong>Type</strong>
              <p>{job.level}</p>
            </div>

            <div>
              <strong>Category</strong>
              <p>{job.category}</p>
            </div>

            <div>
              <strong>Salary</strong>
              <p>${job.salary}</p>
            </div>

            <div>
              <strong>Location</strong>
              <p>{job.location}</p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default JobDetails;
