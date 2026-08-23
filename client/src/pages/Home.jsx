/**
 * Home page.
 *
 * Purpose: present hero/search entry points and a featured subset of jobs.
 */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobCards from "../components/JobCards";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";

/**
 * Renders the landing page and fetches jobs for featured cards.
 *
 * @returns {JSX.Element} Home layout with hero, filters, and featured jobs.
 * @sideeffects Performs a backend fetch and updates local component state.
 */
const Home = () => {
  const { showFilters, setShowFilters, backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  // fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs`);

        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        setError(error.message);
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
