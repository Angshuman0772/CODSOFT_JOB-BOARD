import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { BriefcaseBusiness } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setshowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <BriefcaseBusiness />
        <span>HireFlow</span>
      </Link>

      {user ? (
        <div className="user-section">
          <Link to="/applications">Applied Jobs</Link>

          <p>Hi, {user.firstName}</p>

          <UserButton />
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="login-btn"
            onClick={() => setshowRecruiterLogin(true)}
          >
            Recruiter Login
          </button>

          <button className="register-btn" onClick={() => openSignIn()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
