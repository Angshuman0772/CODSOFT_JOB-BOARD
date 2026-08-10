import { Link } from "react-router-dom";
import "./JobCards.css";

const JobCards = ({ jobs }) => {
  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <Link className="job-card" key={job._id} to={`/jobs/${job._id}`}>
          <div className="job-card-header">
            <span className="job-tag">{job.category}</span>
          </div>

          <h3>{job.title}</h3>

          <p className="company-name">{job.companyId.name}</p>

          <div className="job-meta">
            <span>{job.location}</span>
            <span>{job.level}</span>
          </div>

          <div className="job-footer">
            <span className="salary">
              ${(job.salary / 1000).toFixed(0)}k/year
            </span>

            <button>Apply Now</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobCards;
