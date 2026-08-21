/**
 * Job card grid component.
 *
 * Purpose: render a reusable collection view of job summaries with detail links.
 */
import { Link } from "react-router-dom";
import "./JobCards.css";

/**
 * Displays a list of job cards.
 *
 * @param {{ jobs: Array<{ _id: string, category: string, title: string, companyId: { name: string }, location: string, level: string, salary: number }> }} props - Job collection.
 * @returns {JSX.Element} Grid of job cards.
 * @sideeffects None.
 */
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
