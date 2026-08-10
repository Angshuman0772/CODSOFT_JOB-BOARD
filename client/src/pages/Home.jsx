import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import JobCards from "../components/JobCards";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";
import { jobsData } from "../assets/assets";

const Home = () => {
  const { showFilters, setShowFilters } = useContext(AppContext);
  return (
    <div>
      <NavBar />
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

        {/* Job Listings */}
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

          <JobCards jobs={jobsData.slice(0, 6)} />
        </section>
      </div>
    </div>
  );
};

export default Home;
