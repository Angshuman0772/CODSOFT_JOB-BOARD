import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import JobApplications from "./pages/JobApplications";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<ApplyJob />} />
        <Route path="/applications" element={<JobApplications />} />
      </Routes>
  );
};

export default App;
