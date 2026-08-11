import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import { jobsData, assets } from "../assets/assets";
import "../styles/JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();

  const job = jobsData.find((job) => job._id === id);

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
