import { useContext } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import "./JobListing.css";
import JobCards from "./JobCards";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

  return (
    <div className="job-listing-container">
      <div className="job-sidebar">
        {/* Current Search */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="filter-group">
            <h3>Current Search</h3>

            <div className="filter-list">
              {searchFilter.title && (
                <div className="filter-chip">
                  <span>{searchFilter.title}</span>

                  <X
                    size={14}
                    onClick={() =>
                      setSearchFilter({
                        ...searchFilter,
                        title: "",
                      })
                    }
                  />
                </div>
              )}

              {searchFilter.location && (
                <div className="filter-chip">
                  <span>{searchFilter.location}</span>

                  <X
                    size={14}
                    onClick={() =>
                      setSearchFilter({
                        ...searchFilter,
                        location: "",
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="filter-group">
          <h3>Search By Categories</h3>

          {JobCategories.map((category) => (
            <label key={category} className="checkbox-row">
              <input type="checkbox" />
              <span>{category}</span>
            </label>
          ))}
        </div>

        {/* Locations */}
        <div className="filter-group">
          <h3>Search By Location</h3>

          {JobLocations.map((location) => (
            <label key={location} className="checkbox-row">
              <input type="checkbox" />
              <span>{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <section className="featured-job-listings">
        <div className="featured-header">
          <div>
            <h2>Featured Jobs</h2>
            <p>Hand-picked opportunities from top companies</p>
          </div>

          <button className="view-all-btn">View All Jobs</button>
        </div>

        <JobCards />
      </section>
    </div>
  );
};

export default JobListing;
