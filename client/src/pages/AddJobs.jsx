import { useState, useEffect, useRef } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../styles/AddJobs.css";

const AddJobs = () => {
  const [state, setState] = useState({
    jobTitle: "",
    jobCategory: JobCategories[0],
    jobLocation: JobLocations[0],
    jobLevel: "Entry Level",
    salary: "",
  });

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write the job description here...",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobDescription = quillRef.current.root.innerHTML;

    const jobData = {
      ...state,
      description: jobDescription,
    };

    console.log(jobData);
  };

  return (
    <div className="add-job-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Add New Job</h2>

        {/* Job Title */}
        <div className="field-group">
          <label>Job Title</label>

          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={state.jobTitle}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                jobTitle: e.target.value,
              }))
            }
          />
        </div>

        {/* Job Description */}
        <div className="field-group">
          <label>Job Description</label>

          <div ref={editorRef}></div>
        </div>

        {/* Lower Fields */}
        <div className="lower-input-container">
          <div className="field-group">
            <label>Job Category</label>

            <select
              value={state.jobCategory}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  jobCategory: e.target.value,
                }))
              }
            >
              {JobCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Job Location</label>

            <select
              value={state.jobLocation}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  jobLocation: e.target.value,
                }))
              }
            >
              {JobLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Job Level</label>

            <select
              value={state.jobLevel}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  jobLevel: e.target.value,
                }))
              }
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>

          <div className="field-group">
            <label>Salary (₹/year)</label>

            <input
              type="number"
              placeholder="600000"
              value={state.salary}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  salary: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <button type="submit" className="publish-btn">
          Publish Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
