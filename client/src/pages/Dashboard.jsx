import { NavLink, Outlet } from "react-router-dom";
import { BriefcaseBusiness, PlusCircle, Users } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/Dashboard.css";

const Dashboard = () => {
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
