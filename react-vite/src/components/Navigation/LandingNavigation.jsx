import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function LandingNavigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div id="left-nav-content">
        <img onClick={() => navigate("/")} id="logo" src={"https://i.ibb.co/n1RDxpj/On-Tap-Logo.png"} alt="Home" />
        <div id="nav-links-div">
          {/* <NavLink to="/beers" className="nav-link">Beers</NavLink>
          <NavLink to="/breweries" className="nav-link">Breweries</NavLink> */}
        </div>
      </div>

      <ProfileButton id='profile-button' user={sessionUser} />
    </nav>
  );
}

export default LandingNavigation;
