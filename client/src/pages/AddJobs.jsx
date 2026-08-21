/**
 * Recruiter add-job page.
 *
 * Purpose: compose and publish a new job posting from the dashboard.
 */
import { useState, useEffect, useRef } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../styles/AddJobs.css";

/**
 * Renders the job publication form and submits recruiter-authenticated requests.
 *
 * @returns {JSX.Element} Add-job form with rich-text description editor.
 * @sideeffects Initializes a Quill editor instance and performs API POST requests.
 */
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

  const { backendUrl, companyToken } = useContext(AppContext);

  useEffect(() => {
    // Guard against duplicate editor initialization across re-renders.
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

  /**
   * Submits a new job payload generated from form state and editor content.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event.
   * @returns {Promise<void>} Resolves after request handling and UI feedback.
   * @sideeffects Performs network I/O, emits toast notifications, and resets local form/editor state.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobDescription = quillRef.current.root.innerHTML;

      console.log("Submitting job...");
      console.log("Token:", companyToken);

      const response = await axios.post(
        `${backendUrl}/api/company/post-job`,
        {
          ...state,
          title: state.jobTitle,
          description: jobDescription,
          category: state.jobCategory,
          location: state.jobLocation,
          level: state.jobLevel,
          salary: state.salary,
        },
        {
          headers: {
            token: companyToken,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setState({
          jobTitle: "",
          jobCategory: JobCategories[0],
          jobLocation: JobLocations[0],
          jobLevel: "Entry Level",
          salary: "",
        });

        quillRef.current.setText("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
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
