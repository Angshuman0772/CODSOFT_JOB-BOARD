import { viewApplicationsPageData } from "../assets/assets";
import "../styles/ViewApplications.css"
const ViewApplications = () => {
  return (
    <div className="applications-page">
      <div className="applications-card">
        <table className="applications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  <div className="applicant-info">
                    <img src={applicant.imgSrc} alt="" />
                    <span>{applicant.name}</span>
                  </div>
                </td>

                <td>{applicant.jobTitle}</td>

                <td>{applicant.location}</td>

                <td>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="resume-link"
                  >
                    View Resume
                  </a>
                </td>

                <td>
                  <div className="action-menu">
                    <button className="menu-btn">⋮</button>

                    <div className="action-dropdown">
                      <button className="accept-btn">Accept</button>

                      <button className="reject-btn">Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
