import { useContext, useRef } from "react";
import { Search, BriefcaseBusiness, Users, Building2 } from "lucide-react";

import {
  SiSpotify,
  SiCloudflare,
  SiDiscord,
  SiAsana,
  SiLinear,
} from "react-icons/si";

import { AppContext } from "../context/AppContext";
import "./Hero.css";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleSearch = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;
    setSearchFilter({ title, location });
    setIsSearched(true);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Find Your Dream Job Today!</h1>

        <p>
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Job Title or Company"
            ref={titleRef}
          />

          <input type="text" placeholder="Location" ref={locationRef} />

          <button onClick={handleSearch}>
            <Search size={18} />
            Search Job
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="icon">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h3>25,850</h3>
              <span>Jobs</span>
            </div>
          </div>

          <div className="stat">
            <div className="icon">
              <Users size={20} />
            </div>

            <div>
              <h3>10,250</h3>
              <span>Candidates</span>
            </div>
          </div>

          <div className="stat">
            <div className="icon">
              <Building2 size={20} />
            </div>

            <div>
              <h3>18,400</h3>
              <span>Companies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="company-strip">
        <div className="company">
          <SiSpotify />
          <span>Spotify</span>
        </div>

        <div className="company">
          <SiCloudflare />
          <span>Cloudflare</span>
        </div>

        <div className="company">
          <SiDiscord />
          <span>Discord</span>
        </div>

        <div className="company">
          <SiAsana />
          <span>Asana</span>
        </div>

        <div className="company">
          <SiLinear />
          <span>Linear</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
