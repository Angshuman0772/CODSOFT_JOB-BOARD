import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const { companyData } = useContext(AppContext);

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
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
