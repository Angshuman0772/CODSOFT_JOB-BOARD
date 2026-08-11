import { useState } from "react";
import { X } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./RecruiterLogin.css";

const RecruiterLogin = () => {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const { setshowRecruiterLogin } = useContext(AppContext);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const isLogin = mode === "login";

  // handleChange function to update formData state when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleLogoChange function to update formData state when the logo file input changes
  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  // handleToggleMode function to switch between login and registration modes
  const handleToggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setStep(1);
  };

  // handleSubmit function to handle form submission for both login and registration; switches to the next step in registration if applicable
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Login", {
        email: formData.email,
        password: formData.password,
      });

      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    console.log("Register", formData);
  };

  return (
    <div className="recruiter-overlay">
      <form
        className="recruiter-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="close-btn"
          onClick={() => setshowRecruiterLogin(false)}
        >
          <X size={20} />
        </button>

        <h2>Recruiter {isLogin ? "Login" : "Registration"}</h2>

        <p className="subtitle">
          {isLogin
            ? "Welcome back! Sign in to continue."
            : step === 1
              ? "Create your recruiter account."
              : "Upload your company logo."}
        </p>

        {/* LOGIN FORM */}

        {isLogin && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* registration step 1 */}

        {!isLogin && step === 1 && (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </>
        )}

        {/* registration step 2 */}

        {!isLogin && step === 2 && (
          <div className="logo-section">
            <label className="logo-upload">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleLogoChange}
              />

              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="logo-preview"
                />
              ) : (
                <div className="logo-placeholder">Click to upload logo</div>
              )}
            </label>
          </div>
        )}

        {/* action buttons */}

        <div className="form-actions">
          {!isLogin && step === 2 && (
            <button
              type="button"
              className="back-btn"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : step === 1 ? "Next" : "Register"}
          </button>
        </div>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            type="button"
            className="toggle-btn"
            onClick={handleToggleMode}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RecruiterLogin;
