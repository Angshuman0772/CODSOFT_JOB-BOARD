import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

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
