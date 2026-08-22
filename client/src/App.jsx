/**
 * Client route shell.
 *
 * Purpose: define public and recruiter dashboard routes and mount global overlays.
 */
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplications from "./pages/JobApplications";
import Jobs from "./pages/JobsPage";
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import RecruiterLogin from "./components/RecruiterLogin";
import { ToastContainer } from "react-toastify";

/**
 * Root application component that maps URL paths to page components.
 *
 * @returns {JSX.Element} App-level route tree and shared UI wrappers.
 * @sideeffects Reads global auth/modal state from AppContext.
 */
const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="manage-jobs" replace />} />
          <Route path="add-jobs" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
