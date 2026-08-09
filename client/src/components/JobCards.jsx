import { jobsData } from "../assets/assets";
import "./JobCards.css";

const JobCards = () => {
  return (
    <div className="jobs-grid">
      {jobsData.slice(0, 6).map((job) => (
        <div key={job._id} className="job-card">
          <div className="job-card-top">
            <img
              src={job.companyId.image}
              alt={job.companyId.name}
              className="company-logo"
            />

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
        </div>
      ))}
    </div>
  );
};

export default JobCards;
