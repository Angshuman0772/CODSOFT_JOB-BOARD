/**
 * Global client-side application context.
 *
 * Purpose: centralize shared UI state, auth-linked profile data, and job filtering behavior.
 */
import { createContext, useCallback, useState } from "react";
import { jobsData } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser, useAuth } from "@clerk/react";

const AppContext = createContext();

/**
 * Context provider for global app state and actions.
 *
 * @param {{ children: import("react").ReactNode }} props - Provider props with nested app tree.
 * @returns {JSX.Element} Context provider wrapper.
 * @sideeffects Reads/writes localStorage, performs backend API requests, and triggers toast notifications.
 */
export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

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

  // store name, email, image, and other data of the logged-in user
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // State to hold the uploaded resume file
  const [resume, setResume] = useState(null);

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

  /**
   * Fetches profile data for the currently authenticated Clerk user.
   *
   * @returns {Promise<void>} Resolves after state is updated or error is reported.
   * @sideeffects Requests an auth token, performs network I/O, updates userData state, and emits toasts.
   */
  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();
      // console.log("Clerk token:", token);
      const { data } = await axios.get(`${backendUrl}/api/user/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.user || data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, getToken]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUserData();
    }
  }, [user, fetchUserData]);

  /**
   * Toggles a category in the selected category filter list.
   *
   * @param {string} category - Category label to toggle.
   * @returns {void}
   * @sideeffects Updates searchFilter state.
   */
  const toggleCategory = (category) => {
    setSearchFilter((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  /**
   * Toggles a location in the selected location filter list.
   *
   * @param {string} location - Location label to toggle.
   * @returns {void}
   * @sideeffects Updates searchFilter state.
   */
  const toggleLocation = (location) => {
    setSearchFilter((prev) => ({
      ...prev,
      selectedLocations: prev.selectedLocations.includes(location)
        ? prev.selectedLocations.filter((l) => l !== location)
        : [...prev.selectedLocations, location],
    }));
  };

  // Multiple filter groups are combined with AND semantics to keep search behavior predictable.
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
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    backendUrl,
    resume,
    setResume,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
