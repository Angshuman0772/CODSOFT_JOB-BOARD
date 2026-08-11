import { useState } from "react";
const AddJobs = () => {
  const [state, setState] = useState({
    jobTitle: "",
    jobCategory: useState("SDE"),
    jobLocation: useState("Remote"),
    jobLevel: useState("Entry Level"),
    salary: useState("0"),
  });
  return (
    <div>
      <form>
        <p>Job Title:</p>
        <input
          type="text"
          placeholder="Type here"
          value={state.jobTitle}
          onChange={(e) => setState({ ...state, jobTitle: e.target.value })}
        />
        <p>Job Description:</p>
        {/* TODO: Add a rich text editor for job description */}
        <p>Job Category:</p>
      </form>
    </div>
  );
};

export default AddJobs;
