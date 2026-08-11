import { assets } from "../assets/assets";
import { BriefcaseBusiness } from "lucide-react";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="logo">
        <BriefcaseBusiness size={24} />
        <span>HireFlow</span>
      </div>
      <div className="header-profile">
        <div className="header-text">
          <h3>Slack</h3>
          <p>Richard Smith • Recruiter</p>
        </div>

        <img
          src={assets.company_icon}
          alt="Spotify Logo"
          className="company-logo"
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
