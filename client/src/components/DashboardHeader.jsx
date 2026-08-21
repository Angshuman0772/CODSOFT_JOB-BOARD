/**
 * Dashboard header bar.
 *
 * Purpose: show recruiter identity and provide dashboard logout controls.
 */
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

/**
 * Renders recruiter dashboard header and handles logout state cleanup.
 *
 * @returns {JSX.Element} Dashboard header with optional company profile section.
 * @sideeffects Clears local storage tokens, resets context auth state, and navigates home.
 */
const DashboardHeader = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  /**
   * Signs out the recruiter session from local app state.
   *
   * @returns {void}
   * @sideeffects Clears localStorage values, updates AppContext auth state, and navigates.
   */
  const handleLogout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    localStorage.removeItem("token");
    setCompanyData(null);
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <Link to="/" className="logo">
        <BriefcaseBusiness size={24} />
        <span>HireFlow</span>
      </Link>
      {companyData && (
        <div className="header-profile">
          <div className="header-text">
            <h3>{companyData.name}</h3>
          </div>

          <img
            src={companyData.image}
            alt="Spotify Logo"
            className="company-logo"
          />

          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
