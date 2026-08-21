/**
 * Recruiter dashboard shell.
 *
 * Purpose: provide dashboard navigation and nested route outlet for recruiter workflows.
 */
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { BriefcaseBusiness, PlusCircle, Users } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/Dashboard.css";

/**
 * Renders recruiter dashboard layout and enforces default child navigation.
 *
 * @returns {JSX.Element} Sidebar-based dashboard shell with nested content outlet.
 * @sideeffects Redirects to manage-jobs route when company data is available.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData } = useContext(AppContext);
  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData, navigate]);
  return (
    <>
      <DashboardHeader />
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <NavLink to="/">
            <div className="sidebar-logo">
              <h2>Recruiter Dashboard</h2>
            </div>
          </NavLink>

          <nav>
            <NavLink to="/dashboard/manage-jobs">
              <BriefcaseBusiness size={18} />
              Manage Jobs
            </NavLink>

            <NavLink to="/dashboard/add-jobs">
              <PlusCircle size={18} />
              Add Job
            </NavLink>

            <NavLink to="/dashboard/view-applications">
              <Users size={18} />
              View Applications
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
