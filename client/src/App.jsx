import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplications from "./pages/JobApplications";
import Jobs from "./pages/JobsPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
  );
};

export default App;
