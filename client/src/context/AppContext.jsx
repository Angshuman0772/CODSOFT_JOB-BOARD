import { createContext, useState } from "react";
import { jobsData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  // State to hold the search filter values
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
    selectedCategories: [],
    selectedLocations: [],
  });

  // State to track if a search has been performed
  const [isSearched, setIsSearched] = useState(false);

  // State to control the visibility of the filters sidebar
  const [showFilters, setShowFilters] = useState(false);

  // State to control the visibility of the recruiter login modal
  const [showRecruiterLogin, setshowRecruiterLogin] = useState(false);

  const toggleCategory = (category) => {
    setSearchFilter((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const toggleLocation = (location) => {
    setSearchFilter((prev) => ({
      ...prev,
      selectedLocations: prev.selectedLocations.includes(location)
        ? prev.selectedLocations.filter((l) => l !== location)
        : [...prev.selectedLocations, location],
    }));
  };

  const filteredJobs = jobsData.filter((job) => {
    const titleMatch =
      !searchFilter.title ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const searchLocationMatch =
      !searchFilter.location ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const categoryMatch =
      searchFilter.selectedCategories.length === 0 ||
      searchFilter.selectedCategories.includes(job.category);

    const locationMatch =
      searchFilter.selectedLocations.length === 0 ||
      searchFilter.selectedLocations.includes(job.location);

    return titleMatch && searchLocationMatch && categoryMatch && locationMatch;
  });

  const value = {
    searchFilter,
    setSearchFilter,
    toggleCategory,
    toggleLocation,
    isSearched,
    setIsSearched,
    showFilters,
    setShowFilters,
    filteredJobs,
    showRecruiterLogin,
    setshowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
