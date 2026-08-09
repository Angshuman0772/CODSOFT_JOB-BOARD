import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import JobApplications from "./pages/JobApplications";
import Jobs from "./pages/JobsPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/applications" element={<JobApplications />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
  );
};

export default App;
