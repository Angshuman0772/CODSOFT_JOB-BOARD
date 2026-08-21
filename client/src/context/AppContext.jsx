import { createContext, useState } from "react";
import { jobsData } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  // State to hold the company token and company data for recruiter authentication
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Check for an existing recruiter login and restore authentication state
  useEffect(() => {
    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  // Fetch company data when the company token changes
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/company/company-data`,
          {
            headers: { token: companyToken },
          },
        );

        if (data.success) {
          setCompanyData(data.company);
          // console.log(data.company);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken, backendUrl]);

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
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
