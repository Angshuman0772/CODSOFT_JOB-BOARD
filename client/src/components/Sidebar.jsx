import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { X, Search, MapPin } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ showSearch, redirectOnFilter }) => {
  const {
    searchFilter,
    setSearchFilter,
    toggleCategory,
    toggleLocation,
    showFilters,
    isSearched,
  } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div
      id="job-filters"
      className={`job-sidebar ${showFilters ? "open" : ""}`}
      aria-hidden={!showFilters}
    >
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

      {showSearch && (
        <>
          {/* Search by Job Title */}
          <div className="sidebar-search-section">
            <h3>Search by Job Title</h3>

            <div className="sidebar-search-input">
              <Search size={18} />
              <input
                type="text"
                placeholder="Job title or company"
                value={searchFilter.title}
                onChange={(e) =>
                  setSearchFilter({
                    ...searchFilter,
                    title: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Location */}
          <div className="sidebar-search-section">
            <h3>Location</h3>

            <div className="sidebar-search-input">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Choose city"
                value={searchFilter.location}
                onChange={(e) =>
                  setSearchFilter({
                    ...searchFilter,
                    location: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </>
      )}

      {/* Categories */}
      <div className="filter-group">
        <h3>Search By Categories</h3>

        {JobCategories.map((category) => (
          <label key={category} className="checkbox-row">
            <input
              type="checkbox"
              checked={searchFilter.selectedCategories.includes(category)}
              onChange={() => {
                toggleCategory(category);

                if (redirectOnFilter) {
                  navigate("/jobs");
                }
              }}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Locations */}
      <div className="filter-group">
        <h3>Search By Location</h3>

        {JobLocations.map((location) => (
          <label key={location} className="checkbox-row">
            <input
              type="checkbox"
              checked={searchFilter.selectedLocations.includes(location)}
              onChange={() => {
                toggleLocation(location);

                if (redirectOnFilter) {
                  navigate("/jobs");
                }
              }}
            />
            {location}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
