import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobCards from "../components/JobCards";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

const Home = () => {
  const { showFilters, setShowFilters, backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/jobs`);

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        // Supports either an array response or { jobs: [...] }
        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, [backendUrl]);

  return (
    <div>
      <Navbar />
      <Hero />

      <div className="job-listing-container">
        <button
          className="mobile-filter-btn"
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-expanded={showFilters}
          aria-controls="job-filters"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <Sidebar redirectOnFilter={true} />

        <section className="featured-job-listings">
          <div className="featured-header">
            <div>
              <h2>Featured Jobs</h2>
              <p>Hand-picked opportunities from top companies</p>
            </div>

            <Link to="/jobs" className="view-all-btn">
              View All Jobs
            </Link>
          </div>

          {error && <p className="error-message">{error}</p>}
          {!error && <JobCards jobs={jobs.slice(0, 6)} />}
        </section>
      </div>
    </div>
  );
};

export default Home;
