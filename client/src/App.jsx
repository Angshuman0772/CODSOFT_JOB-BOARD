import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplications from "./pages/JobApplications";
import RecruiterLogin from "./components/RecruiterLogin";
import Jobs from "./pages/JobsPage";

const App = () => {
  const { isRecruiter } = useContext(AppContext);
  return (
    <div>
      {isRecruiter && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </div>
  );
};

export default App;
