import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  
  // State to hold the search filter values
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  // State to track if a search has been performed
  const [isSearched, setIsSearched] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    showFilters,
    setShowFilters,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext };
