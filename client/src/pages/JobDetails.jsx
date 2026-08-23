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
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/react";
import "../styles/JobDetails.css";

/**
 * Resolves and renders job details for the route id.
 *
 * @returns {JSX.Element} Job details view or fallback message.
 * @sideeffects Fetches backend job details and updates component state.
 */
const JobDetails = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { backendUrl, userData, userApplications, fetchUserApplications } =
    useContext(AppContext);
  const [job, setJob] = useState(null);

  // Check if the user has already applied for this job
  const hasApplied = userApplications.some(
    (application) =>
      application.jobId?._id === job?._id || application.jobId === job?._id,
  );

  // fetch job details from backend
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);

        setJob(data.success ? data.job : null);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setJob(null);
      }
    };

    fetchJobDetails();
  }, [backendUrl, id]);

  if (!job) {
    return <h2>Job not found</h2>;
  }
  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Please login to apply for jobs");
      }

      if (!userData?.resume) {
        return toast.error("Please upload a resume before applying");
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/apply`,
        { jobId: job._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while applying for the job",
      );
    }
  };

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
        <aside className="job-details-sidebar">
          <Link onClick={applyHandler} to="/applications" className="apply-btn">
            {hasApplied ? "Already Applied" : "Apply Job"}
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
